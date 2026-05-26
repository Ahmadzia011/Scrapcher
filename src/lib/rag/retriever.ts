import supabase from "../supabase";
import { embeddingModel } from "@/src/lib/chat-model";

export async function retrieveData(chatbotId: any, question: any) {
  
  const embeddingModelInstance = embeddingModel()
  const vectorQuery = await embeddingModelInstance.embedQuery(question);
  const client = supabase();
  const { data: topCandidates } = await client.rpc("match_documents", {
    queryEmbedding: vectorQuery,
    matchCount: 5,
    filter: { chatbotId : chatbotId },
  });
  return topCandidates;
}
