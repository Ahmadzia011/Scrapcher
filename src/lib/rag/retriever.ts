import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { CohereRerank } from "@langchain/cohere";
import { ContextualCompressionRetriever } from "@langchain/classic/retrievers/contextual_compression";
import supabase from "../supabase";
import { embeddingModel } from "@/src/lib/chat-model";

export async function retrieveData(chatbotId: any, question: any) {
  const embeddingModelInstance = embeddingModel();
  const client = supabase();

  const vectorStore = new SupabaseVectorStore(embeddingModelInstance, {
    client,
    tableName: "documents",
    queryName: "match_documents",
  });

    const baseRetriever = vectorStore.asRetriever({
    k: 20, 
    searchKwargs: {
      filter: { chatbotId: chatbotId },
    } as any,
  });
  
  const reranker = new CohereRerank(
    {
      model: "rerank-english-v3.0",
      apiKey: process.env.COHERE_API_KEY  ,
      topN: 5
    }
  )

  const compressionRetriever = new ContextualCompressionRetriever({
    baseCompressor: reranker,
    baseRetriever: baseRetriever,
  });

  
  try {
    const topCandidates = await compressionRetriever.invoke(question);
    return topCandidates;
  } catch (error) {
    console.error("Error retrieving documents:", error);
    return [];
  }
}
