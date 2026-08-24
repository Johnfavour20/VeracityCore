import type { IncomingMessage, ServerResponse } from "http";
import {
  runAIAnalysis,
  generateFallbackAnalysis,
  type AnalysisRequest,
} from "../src/lib/analysis";

type VercelReq = IncomingMessage & { body?: any };
type VercelRes = ServerResponse & {
  status: (code: number) => VercelRes;
  json: (body: any) => void;
};

export default async function handler(req: VercelReq, res: VercelRes) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
    return;
  }

  try {
    const body: AnalysisRequest = req.body || {};
    const { url = "", title = "", content = "" } = body;

    if (!url.trim() && !title.trim() && !content.trim()) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          error: "Please provide an article URL, title, or text content.",
        })
      );
      return;
    }

    const result = await runAIAnalysis({ url, title, content });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result));
  } catch (error: any) {
    console.error("Analysis Error:", error);
    const body: AnalysisRequest = req.body || {};
    const fallback = generateFallbackAnalysis(
      body.title || "",
      body.url || "",
      body.content || ""
    );
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(fallback));
  }
}
