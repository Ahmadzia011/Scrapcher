import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

async function run() {
  try {
    const embeddings = new HuggingFaceInferenceEmbeddings({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      apiKey: process.env.HUGGINGFACE_API_KEY
    });
    const res = await embeddings.embedQuery("Hello world");
    console.log("Vector length:", res.length);
  } catch (e) {
    console.error(e);
  }
}
run();
