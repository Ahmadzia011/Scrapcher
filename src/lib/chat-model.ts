import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { ChatGroq } from "@langchain/groq";

export default function ChatModel(){

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
  temperature:0
  }
)

return llm
}

export function EmbeddingModel(){
   const embedding_model = new HuggingFaceInferenceEmbeddings({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      apiKey: process.env.HUGGINGFACE_API_KEY,
      provider: "hf-inference", 

  }); 
  return embedding_model
}