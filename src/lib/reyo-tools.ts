// REYO — tool (function) definitions + handlers.
//
// `REYO_TOOLS` is sent to the Realtime API in `session.update` so the model
// knows what it's allowed to call.
// `REYO_TOOL_HANDLERS` is what actually runs in your app when the model
// calls one of those tools. Right now these are STUBS — wire each one up to
// your real backend (Gmail API, WhatsApp Business API, your app's own API).

export const REYO_TOOLS = [
  {
    type: "function",
    name: "get_work_status",
    description:
      "Get the current status of work in the user's app: in-progress, completed, pending, and overdue/blocked items.",
    parameters: {
      type: "object",
      properties: {
        filter: {
          type: "string",
          enum: ["all", "in_progress", "pending", "overdue", "completed"],
          description: "Which subset of work to return. Use 'all' for a general status check.",
        },
      },
      required: ["filter"],
    },
  },
  {
    type: "function",
    name: "send_email",
    description:
      "Send an email to a contact. Only call this AFTER the user has explicitly confirmed they want it sent.",
    parameters: {
      type: "object",
      properties: {
        to_name: { type: "string", description: "Name of the recipient, as known in the app (e.g. 'Ravi Sharma')." },
        subject: { type: "string", description: "Email subject line." },
        body: { type: "string", description: "Email body, written naturally." },
      },
      required: ["to_name", "subject", "body"],
    },
  },
  {
    type: "function",
    name: "send_whatsapp_message",
    description:
      "Send a WhatsApp message to a contact. Only call this AFTER the user has explicitly confirmed they want it sent.",
    parameters: {
      type: "object",
      properties: {
        to_name: { type: "string", description: "Name of the recipient, as known in the app." },
        message: { type: "string", description: "The message text to send." },
      },
      required: ["to_name", "message"],
    },
  },
  {
    type: "function",
    name: "approve_item",
    description:
      "Approve a pending item (task, request, document) in the app. Only call this AFTER explicit user confirmation.",
    parameters: {
      type: "object",
      properties: {
        item_name: { type: "string", description: "Name/description of the item being approved." },
      },
      required: ["item_name"],
    },
  },
  {
    type: "function",
    name: "reject_item",
    description:
      "Reject a pending item (task, request, document) in the app. Only call this AFTER explicit user confirmation.",
    parameters: {
      type: "object",
      properties: {
        item_name: { type: "string", description: "Name/description of the item being rejected." },
        reason: { type: "string", description: "Optional short reason for the rejection." },
      },
      required: ["item_name"],
    },
  },
];

// ---- Handlers -------------------------------------------------------------
// Replace the body of each function with a real call to your backend.
// Each handler MUST return a plain object/string — it gets JSON.stringified
// and sent back to the model as the tool's output.

async function getWorkStatus({ filter }: { filter: string }) {
  // TODO: replace with a real call to your app's API, e.g.:
  // const res = await fetch(`${process.env.APP_API_URL}/tasks?filter=${filter}`, {
  //   headers: { Authorization: `Bearer ${process.env.APP_API_KEY}` },
  // });
  // return await res.json();

  // Stub data so you can test the voice flow end-to-end before wiring real data:
  return {
    filter,
    in_progress: [{ name: "Design review", owner: "You" }],
    pending: [
      { name: "Server backup", days_pending: 5 },
      { name: "Client follow-up", days_pending: 1 },
    ],
    overdue: [{ name: "Client invoice", due: "yesterday" }],
    completed_today: [{ name: "Bug fix #214" }],
  };
}

async function sendEmail({ to_name, subject, body }: { to_name: string; subject: string; body: string }) {
  // TODO: wire to Gmail API / your transactional email service, e.g.:
  // await gmail.users.messages.send({ userId: "me", requestBody: { raw: buildMimeMessage(...) } });
  console.log("[STUB] send_email", { to_name, subject, body });
  return { success: true, to_name, subject };
}

async function sendWhatsappMessage({ to_name, message }: { to_name: string; message: string }) {
  // TODO: wire to WhatsApp Business API (Meta Cloud API or Twilio), e.g.:
  // await fetch(`https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`, { ... });
  console.log("[STUB] send_whatsapp_message", { to_name, message });
  return { success: true, to_name };
}

async function approveItem({ item_name }: { item_name: string }) {
  // TODO: wire to your app's own backend API to actually mark it approved.
  console.log("[STUB] approve_item", { item_name });
  return { success: true, item_name, status: "approved" };
}

async function rejectItem({ item_name, reason }: { item_name: string; reason?: string }) {
  // TODO: wire to your app's own backend API to actually mark it rejected.
  console.log("[STUB] reject_item", { item_name, reason });
  return { success: true, item_name, status: "rejected", reason: reason ?? null };
}

export const REYO_TOOL_HANDLERS: Record<string, (args: any) => Promise<any>> = {
  get_work_status: getWorkStatus,
  send_email: sendEmail,
  send_whatsapp_message: sendWhatsappMessage,
  approve_item: approveItem,
  reject_item: rejectItem,
};
