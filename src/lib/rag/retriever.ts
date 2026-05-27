import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import supabase from "../supabase";
import { embeddingModel } from "@/src/lib/chat-model";

export async function retrieveData(chatbotId: any, question: any) {
  const embeddingModelInstance = embeddingModel();
  const client = supabase();

  const vectorStore = new SupabaseVectorStore(embeddingModelInstance, {
    client,
    tableName: "documents",
    queryName: "match_documents",
    filter: { chatbotId: chatbotId },
  });

  const retriever = vectorStore.asRetriever(5);

  
  try {
    const topCandidates = await retriever.invoke(question);
    return topCandidates;
  } catch (error) {
    console.error("Error retrieving documents:", error);
    return [];
  }
}
