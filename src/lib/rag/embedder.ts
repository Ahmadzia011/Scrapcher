import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import supabase from "../supabase";
import { embeddingModel } from "@/src/lib/chat-model";



export async function embedData(dataset: any, url: any, chatbotId: string) {

  const origin = new URL(url).origin
  console.log("Embedder is called");
  const client = supabase();
  // It initializes the object Recursive text splitter
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  if (!dataset || dataset.length === 0) {
    throw new Error("Site has no data.");
  }


  const embeddingModelInstance = embeddingModel()



  for (const data of dataset) {

    try {
      // It creates small documents of clean_data of size 500 character.
      const docs = await textSplitter.splitText(data);

      const validDocs = docs.filter(doc => doc && doc.trim().length > 0);
      if (validDocs.length === 0) continue;

      const vectorStore = await SupabaseVectorStore.fromTexts(
        validDocs, // List of string (docs) to convert in vector and then store in vector db.
        validDocs.map(() => ({ sourceUrl: url, chatbotId: chatbotId, origin })), // Maps each doc to a metadata object
        embeddingModelInstance, //Model that will be used to convert strings to vector.
        {
          client,
          tableName: "documents", // Table to work on
          queryName: "match_documents", // Database function for semantic search logic.
        },
      );
    }
    catch (e) {
      console.error("Embedding error:", e);
      throw new Error("Embedding failed.");
    }
  }

  console.log("Embedding done");
}