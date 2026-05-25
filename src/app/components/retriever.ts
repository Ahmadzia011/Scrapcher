import SupaBase from "../../lib/supabase";
import { EmbeddingModel } from "@/src/lib/chat-model";

export async function Retriever(chatbot_id: any, question: any) {
  
  const embedding_model = EmbeddingModel()
  const vector_query = await embedding_model.embedQuery(question);
  const client = SupaBase();
  const { data: top_candidates } = await client.rpc("match_documents", {
    query_embedding: vector_query,
    match_count: 5,
    filter: { chatbot_id : chatbot_id },
  });
  return top_candidates;
}
