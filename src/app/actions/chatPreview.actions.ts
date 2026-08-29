"use server";

import { getResponse } from "@/src/components/rag/responseGenerator";

// The demo chat is memory-only on the client (see DemoChatModal) — nothing
// here touches the database.
export async function askAssistant(
  chatbotId: string,
  question: string,
  history: string[] = []
) {
  const response = await getResponse(chatbotId, question, history);
  return String(response);
}
