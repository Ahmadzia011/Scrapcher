import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import SupaBase from "../../lib/supabase";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/src/lib/auth";
import { EmbeddingModel } from "@/src/lib/chat-model";



export async function Embeder(dataset: any, url: any, chatbot_id: string) {

  const origin = new URL(url).origin
  console.log("Embeder is called");
  const client = SupaBase();
  // It initializes the object Recursive text splitter
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  if (dataset == undefined) {
    throw new Error("Site has no data.");
  }


  const embedding_model = EmbeddingModel()



  for (const data of dataset) {

    try {
      // It creates small documents of clean_data of size 500 character.
      const docs = await textSplitter.splitText(data);

      const validDocs = docs.filter(doc => doc && doc.trim().length > 0);
      if (validDocs.length === 0) continue;

      const vector_store = await SupabaseVectorStore.fromTexts(
        validDocs, // List of string (docs) to convert in vector and then store in vector db.
        validDocs.map(() => ({ source_url: url, chatbot_id: chatbot_id, origin })), // Maps each doc to a metadata object
        embedding_model, //Model that will be used to convert strings to vector.
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