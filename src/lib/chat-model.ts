import { ChatGroq } from "@langchain/groq";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";



export default function chatModel() {
  const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-20b",
    temperature: 0,
  });
  return llm;
}

let embeddingModelInstance:HuggingFaceTransformersEmbeddings

export function embeddingModel() {
  if (!embeddingModelInstance) {

    embeddingModelInstance = new HuggingFaceTransformersEmbeddings({
      model : "Xenova/all-MiniLM-L6-v2",
    })

   
  }
  return embeddingModelInstance;  
}
