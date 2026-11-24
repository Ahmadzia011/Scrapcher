"use server";

import { getResponse } from "@/src/components/rag/responseGenerator";

// The demo chat is memory-only on the client (see DemoChatModal) — nothing
// here touches the database.
export async function askAssistant(
  chatbotId: string,
  question: string,
  history: string[] = [],
) {
  let response: any;
  
    response = await getResponse(chatbotId, question, history);

    if (!response) {
      return null
    } 
    else {
      return String(response);
    }
  }
