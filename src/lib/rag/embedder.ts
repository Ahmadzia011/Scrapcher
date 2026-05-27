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


  let allText: string[] = []
  let allMetaData: Record<string, any>[] = []

  for (const data of dataset) {

    try {
      // It creates small documents of clean_data of size 500 character.
      const docs = await textSplitter.splitText(data);

      const validDocs = docs.filter(doc => doc && doc.trim().length > 0);
      if (validDocs.length === 0) continue;


      allText.push(...validDocs)
      allMetaData.push(...validDocs.map(() => ({ sourceUrl: url, chatbotId: chatbotId, origin })));

    }
    catch (e) {
      console.error("Failed parsing a document item text chunk:", e);
      continue; 
    }
  }

  if(allText.length > 0){
  try {
    await SupabaseVectorStore.fromTexts(
      allText,
      allMetaData,
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