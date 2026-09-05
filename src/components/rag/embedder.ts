import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { embeddingModel } from "@/src/lib/chat-model";
import supabase from "@/src/lib/supabase";



export async function embedData(dataset: any, origin: any, chatbotId: string) {

  console.log("Embedder is called");
  const client = supabase();
  // It initializes the object Recursive text splitter
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 150,
  });

  if (!dataset || dataset.length === 0) {
    throw new Error("Site has no data.");
  }


  const embeddingModelInstance = embeddingModel()

  console.log('model loaded successfully')

  let allText: string[] = []
  let allMetaData: Record<string, any>[] = []

  for (const data of dataset) {

    try {
      // It creates small documents of clean_data of size 1000 character.
      const docs = await textSplitter.splitText(data);

      const validDocs = docs.filter(doc => doc && doc.trim().length > 0);
      if (validDocs.length === 0) continue;


      allText.push(...validDocs)
      allMetaData.push(...validDocs.map(() => ({ origin: origin, chatbotId: chatbotId})));
      console.log(validDocs)
      console.log('this is alt text:',allText)
    }
    catch (e) {
      console.error("Failed parsing a document item text chunk:", e);
      continue; 
    }
  }

  console.log('this is embedingmodel:',embeddingModelInstance)
  if(allText.length > 0){

  const firstHalfText = allText.slice(0,Math.ceil(allText.length/2))
  const secHalfText = allText.slice(Math.ceil(allText.length/2))

  const firstHalfMeta = allText.slice(0,Math.ceil(allMetaData.length/2))
  const secHalfMeta = allText.slice(Math.ceil(allMetaData.length/2))

  const divallText = [firstHalfText, secHalfText]
  const divallMeta = [firstHalfMeta, secHalfMeta]

  
  console.log(divallMeta, divallText)
  for(let i=0; i<2; i++){
    console.log(i, 'this is all text')
    try {
      await SupabaseVectorStore.fromTexts(
        divallText[i],
        divallMeta[i],
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
}

  console.log("Embedding done");
}