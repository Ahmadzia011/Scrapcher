import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";


import SupaBase from "./supaBase";

export async function Retriever(url: any, question: any) {
  
  const embedding_model = new HuggingFaceInferenceEmbeddings({ 
        model: "sentence-transformers/all-MiniLM-L6-v2",
        apiKey: process.env.HUGGINGFACE_API_KEY
      });

  const vector_query = await embedding_model.embedQuery(question);
  const client = SupaBase();

  const { data: top_candidates } = await client.rpc("match_documents", {
    query_embedding: vector_query,
    match_count: 5,
    filter: { source_url: url },
  });

  console.log(top_candidates)
  return top_candidates;
}
