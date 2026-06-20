"use client";

// components/ReyoVoiceAssistant.tsx
//
// Drop this component anywhere in your Next.js app:
//   <ReyoVoiceAssistant />
//
// It connects to OpenAI's Realtime API over WebRTC, streams your mic to the
// model, plays the model's spoken reply, and executes tool calls (email,
// WhatsApp, approve/reject, work status) through your own backend route.
//
// NOTE: Realtime API event/field names evolve. The shapes used below match
// the GA "Realtime 2" docs at the time this was written. If something
// doesn't fire, check https://platform.openai.com/docs/guides/realtime
// against the event names marked with a comment.

import { useCallback, useRef, useState } from "react";
import { REYO_INSTRUCTIONS } from "@/src/lib/reyo-instructions";
import { REYO_TOOLS } from "@/src/lib/reyo-tools";

type ConnectionState = "idle" | "connecting" | "connected" | "error";

interface TranscriptLine {
  role: "user" | "reyo";
  text: string;
}

export default function ReyoVoiceAssistant() {
  const [state, setState] = useState<ConnectionState>("idle");
  const [muted, setMuted] = useState(false);
  const [lines, setLines] = useState<TranscriptLine[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const currentReyoLineRef = useRef<string>("");

  const appendLine = (role: TranscriptLine["role"], text: string) => {
    setLines((prev) => [...prev, { role, text }]);
  };

  // Runs a tool call on the server, then reports the result back to the model.
  const handleFunctionCall = useCallback(
    async (name: string, callId: string, rawArgs: string) => {
      let args: any = {};
      try {
        args = JSON.parse(rawArgs || "{}");
      } catch {
        // ignore malformed args, send empty object
      }

      let output: any;
      try {
        const res = await fetch("/api/reyo/tool", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, arguments: args }),
        });
        const data = await res.json();
        output = data.result ?? { error: data.error ?? "Tool failed." };
      } catch (err) {
        output = { error: "Could not reach the server to run this action." };
      }

      const dc = dcRef.current;
      if (!dc || dc.readyState !== "open") return;

      // Send the tool's result back as a conversation item...
      dc.send(
        JSON.stringify({
          type: "conversation.item.create",
          item: {
            type: "function_call_output",
            call_id: callId,
            output: JSON.stringify(output),
          },
        })
      );
      // ...then ask the model to continue (speak the result).
      dc.send(JSON.stringify({ type: "response.create" }));
    },
    []
  );

  const handleServerEvent = useCallback(
    (event: any) => {
      switch (event.type) {
        // --- Reyo's spoken reply, streamed in text form ---
        case "response.output_audio_transcript.delta":
        case "response.audio_transcript.delta": // older event name fallback
          currentReyoLineRef.current += event.delta ?? "";
          break;
        case "response.output_audio_transcript.done":
        case "response.audio_transcript.done":
          if (currentReyoLineRef.current.trim()) {
            appendLine("reyo", currentReyoLineRef.current.trim());
          }
          currentReyoLineRef.current = "";
          break;

        // --- What the user said (if input transcription is enabled) ---
        case "conversation.item.input_audio_transcription.completed":
          if (event.transcript?.trim()) {
            appendLine("user", event.transcript.trim());
          }
          break;

        // --- Reyo wants to call a tool ---
        case "response.function_call_arguments.done":
          handleFunctionCall(event.name, event.call_id, event.arguments);
          break;

        case "error":
          console.error("Realtime error event:", event);
          break;

        default:
          // Uncomment while developing to see the full event stream:
          // console.log(event.type, event);
          break;
      }
    },
    [handleFunctionCall]
  );

  const connect = useCallback(async () => {
    setErrorMsg(null);
    setState("connecting");
    try {
      // 1. Get an ephemeral token from our own server (keeps the real API key safe).
      const tokenRes = await fetch("/api/reyo/session");
      const tokenData = await tokenRes.json();
      
      if (!tokenRes.ok || tokenData.error) {
        throw new Error(tokenData.error?.message || tokenData.error || "Failed to get session token.");
      }

      // OpenAI returns { client_secret: { value: "..." } } 
      const ephemeralKey = tokenData?.client_secret?.value || tokenData?.value;
      if (!ephemeralKey) throw new Error("No session token returned. Please check if your OPENAI_API_KEY is correct.");


      // 2. Set up the WebRTC connection.
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      audioElRef.current = audioEl;
      pc.ontrack = (e) => {
        audioEl.srcObject = e.streams[0];
      };

      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = micStream;
      pc.addTrack(micStream.getTracks()[0]);

      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;

      dc.addEventListener("open", () => {
        // Configure the session: personality, tools, transcription.
        dc.send(
          JSON.stringify({
            type: "session.update",
            session: {
              instructions: REYO_INSTRUCTIONS,
              tools: REYO_TOOLS,
              // Transcribe the user's mic input so we can show it in the UI too.
              input_audio_transcription: { model: "whisper-1" },
            },
          })
        );
        setState("connected");
      });

      dc.addEventListener("message", (e) => {
        try {
          handleServerEvent(JSON.parse(e.data));
        } catch {
          // ignore malformed events
        }
      });

      dc.addEventListener("close", () => setState("idle"));

      // 3. Offer/answer handshake with the ephemeral key.
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpResponse = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          "Content-Type": "application/sdp",
        },
      });

      if (!sdpResponse.ok) {
        const errorText = await sdpResponse.text();
        throw new Error(`Realtime handshake failed: ${errorText}`);
      }

      const answer = { type: "answer" as const, sdp: await sdpResponse.text() };
      await pc.setRemoteDescription(answer);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message ?? "Could not connect to Reyo.");
      setState("error");
      disconnect();
    }
  }, [handleServerEvent]);

  const disconnect = useCallback(() => {
    dcRef.current?.close();
    pcRef.current?.close();
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    dcRef.current = null;
    pcRef.current = null;
    micStreamRef.current = null;
    setState("idle");
  }, []);

  const toggleMute = useCallback(() => {
    const stream = micStreamRef.current;
    if (!stream) return;
    const nextMuted = !muted;
    stream.getAudioTracks().forEach((t) => (t.enabled = !nextMuted));
    setMuted(nextMuted);
  }, [muted]);

  const isConnected = state === "connected";
  const isConnecting = state === "connecting";

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-gray-200 bg-white text-gray-800 p-6 shadow-md">
      {/* Orb */}
      <div className="flex flex-col items-center gap-3 mb-5">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full border border-red-400/40 ${
              isConnected ? "animate-ping" : ""
            }`}
          />
          <div
            className={`absolute inset-2 rounded-full border border-red-400/30 ${
              isConnected ? "animate-pulse" : ""
            }`}
          />
          <div
            className={`w-12 h-12 rounded-full transition-colors duration-300 ${
              isConnected
                ? "bg-red-500 shadow-[0_0_25px_6px_rgba(239,68,68,0.55)]"
                : isConnecting
                ? "bg-red-300 animate-pulse"
                : "bg-gray-200"
            }`}
          />
        </div>
        <div className="text-xs tracking-[0.2em] font-sans font-semibold text-red-600 uppercase">
          {state === "idle" && "Reyo — Offline"}
          {state === "connecting" && "Connecting…"}
          {state === "connected" && "Reyo — Listening"}
          {state === "error" && "Connection Error"}
        </div>
      </div>

      {/* Transcript */}
      <div className="h-48 overflow-y-auto rounded-xl bg-gray-50 border border-gray-100 p-4 mb-4 font-sans text-sm space-y-3">
        {lines.length === 0 && (
          <p className="text-gray-400 italic text-center mt-16">
            Say "Hello Reyo" to get started.
          </p>
        )}
        {lines.map((line, i) => (
          <p key={i} className={line.role === "reyo" ? "text-red-800 font-medium bg-red-50/50 p-2 rounded-lg" : "text-gray-700 p-2"}>
            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mr-2">{line.role === "reyo" ? "Reyo:" : "You:"}</span>
            {line.text}
          </p>
        ))}
      </div>

      {errorMsg && <p className="text-red-500 text-xs font-medium mb-3 text-center">{errorMsg}</p>}

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {!isConnected ? (
          <button
            onClick={connect}
            disabled={isConnecting}
            className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 disabled:opacity-50 transition-all shadow-sm shadow-red-200"
          >
            {isConnecting ? "Connecting…" : "Activate Reyo"}
          </button>
        ) : (
          <>
            <button
              onClick={toggleMute}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              {muted ? "Unmute" : "Mute Mic"}
            </button>
            <button
              onClick={disconnect}
              className="px-5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 font-medium text-sm hover:bg-red-100 transition-colors"
            >
              End Call
            </button>
          </>
        )}
      </div>
    </div>
  );
}
