import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { ChatGroq } from "@langchain/groq";

export default function chatModel() {
  const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.1-8b-instant",
    temperature: 0,
  });
  return llm;
}

let embeddingModelInstance:HuggingFaceInferenceEmbeddings

export function embeddingModel() {
  if (!embeddingModelInstance) {
    embeddingModelInstance = new HuggingFaceInferenceEmbeddings({
      model: "sentence-transformers/all-mpnet-base-v2",
      provider: "hf-inference",
      apiKey: process.env.HUGGINGFACE_API_KEY,
    });
  }
  return embeddingModelInstance;
}
