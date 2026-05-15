import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import SupaBase from "./supaBase";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";



export async function Embeder(dataset: any, url: any) {

  const session = await getServerSession(authOptions);
  const user_id = (session?.user as any)?.id;

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

  const embedding_model = new HuggingFaceInferenceEmbeddings({ 
    model: "sentence-transformers/all-MiniLM-L6-v2", // More compatible with free Inference API
    apiKey: process.env.HUGGINGFACE_API_KEY
  });

  for (const data of dataset) {

    try {
      // It creates small documents of clean_data of size 500 character.
      const docs = await textSplitter.splitText(data);

      const validDocs = docs.filter(doc => doc && doc.trim().length > 0);
      if (validDocs.length === 0) continue;
     
      const vector_store = await SupabaseVectorStore.fromTexts(
        validDocs, // List of string (docs) to convert in vector and then store in vector db.
        validDocs.map(() => ({ source_url: url })), // Maps each doc to a metadata object
        embedding_model, //Model that will be used to convert strings to vector.
        {
          client,
          tableName: "documents", // Table to work on
          queryName: "match_documents", // Database function for semantic search logic.
        },
      );
    }
    catch (e) {
      console.error(e)
        const { error: chatError } = await SupaBase()
        .from("documents")
        .delete()
        .eq("session_id", origin)
        .eq("user_id", user_id);
      return "error"
    }
  }

  console.log("Embeding done");
}