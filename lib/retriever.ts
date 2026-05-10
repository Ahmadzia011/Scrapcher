import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'

import SupaBase from "./supaBase";

export async function Retriever(url: any, question: any) {
  
  const embeding_model = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001", // Must match embedder.ts — same model = same vector space
    apiKey: process.env.GOOGLE_API_KEY
  });

  const vector_query = await embeding_model.embedQuery(question);
  const client = SupaBase();

  const { data: top_candidates } = await client.rpc("match_documents", {
    query_embedding: vector_query,
    match_count: 5,
    filter: { source_url: url },
  });

  console.log(top_candidates)
  return top_candidates;
}
