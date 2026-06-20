import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import "dotenv/config";
import { REYO_TOOL_HANDLERS } from "./src/lib/reyo-tools";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(express.json());

  // Minimal API health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // REYO session endpoint
  app.get("/api/reyo/session", async (req, res) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "OPENAI_API_KEY is not set on the server." });
    }
    const sessionConfig = {
      model: "gpt-4o-mini-realtime-preview-2024-12-17",
      voice: "ash"
    };
    try {
      const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionConfig),
      });
      if (!response.ok) {
        const errText = await response.text();
        let errMsg = "Failed to create Realtime session.";
        try {
          const errJson = JSON.parse(errText);
          if (errJson.error?.message) errMsg = errJson.error.message;
        } catch (e) {}
        return res.status(500).json({ error: errMsg });
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate token." });
    }
  });

  // REYO tool endpoint
  app.post("/api/reyo/tool", async (req, res) => {
    try {
      const { name, arguments: args } = req.body;
      if (!name || !REYO_TOOL_HANDLERS[name]) {
        return res.status(404).json({ error: `Tool ${name} not found.` });
      }
      const result = await REYO_TOOL_HANDLERS[name](args);
      res.json({ result });
    } catch (error: any) {
      res.status(500).json({ error: error?.message ?? "Tool execution failed." });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
