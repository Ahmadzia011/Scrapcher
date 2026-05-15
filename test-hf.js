import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

async function run() {
  try {
    const embeddings = new HuggingFaceInferenceEmbeddings({
      model: "jinaai/jina-embeddings-v3",
      apiKey: process.env.HUGGINGFACE_API_KEY
    });
    const res = await embeddings.embedQuery("Hello world");
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}
run();
