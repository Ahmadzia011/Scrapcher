import { getResponse } from "./src/lib/rag/responseGenerator";

async function run() {
  try {
    const result = await getResponse("test", "hello", []);
    console.log("Result:", result);
  } catch(e) {
    console.error("Error:", e);
  }
}
run();
