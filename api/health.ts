import type { IncomingMessage, ServerResponse } from "http";

type VercelRes = ServerResponse & {
  status: (code: number) => any;
  json: (body: any) => void;
};

export default function handler(
  _req: IncomingMessage,
  res: VercelRes
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({ status: "ok", service: "Veritas Heuristic Engine" })
  );
}
