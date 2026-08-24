import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import {
  runAIAnalysis,
  generateFallbackAnalysis,
  type AnalysisRequest,
} from "./src/lib/analysis";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/api/analyze", async (req, res) => {
  try {
    const { url = "", title = "", content = "" }: AnalysisRequest =
      req.body || {};

    if (!url.trim() && !title.trim() && !content.trim()) {
      return res
        .status(400)
        .json({
          error: "Please provide an article URL, title, or text content.",
        });
    }

    const result = await runAIAnalysis({ url, title, content });
    return res.json(result);
  } catch (error: any) {
    console.error("Analysis Error:", error);
    const reqData = req.body || {};
    const fallback = generateFallbackAnalysis(
      reqData.title || "",
      reqData.url || "",
      reqData.content || ""
    );
    return res.json(fallback);
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Veritas Heuristic Engine" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Veritas Server running on http://localhost:${PORT}`);
  });
}

startServer();
