import crypto from "crypto";

// The chatbotId is always sha256(origin) — used to scope documents/embeddings
// per site, verify the embed widget's domain, and key preview chat history.
export function computeChatbotId(origin: string): string {
  const normalizedOrigin = new URL(origin).origin;
  return crypto.createHash("sha256").update(normalizedOrigin).digest("hex");
}
