import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import SupaBase from "./supaBase";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";



export async function Embeder(dataset: any, url: any) {
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

  for (const data of dataset) {

    try {
      // It creates small documents of clean_data of size 500 character.
      const docs = await textSplitter.splitText(data);
      const embeding_model = new GoogleGenerativeAIEmbeddings({
        model: "gemini-embedding-001",  // Must match retriever.ts
        apiKey: process.env.GOOGLE_API_KEY
      });

     
      const vector_store = await SupabaseVectorStore.fromTexts(
        docs, // List of string (docs) to convert in vector and then store in vector db.
        docs.map(() => ({ source_url: url })), // Maps each doc to a metadata object
        embeding_model, //Model that will be used to convert strings to vector.
        {
          client,
          tableName: "documents", // Table to work on
          queryName: "match_documents", // Database function for semantic search logic.
        },
      );
    }
    catch (e) {
      console.error(e)
      return "error"
    }
  }

  console.log("Embeding done");
}