import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import chatModel from "@/src/lib/chat-model";
import { retrieveData } from "./retriever";
import { BRAIN_SYSTEM_PROMPT, NO_ANSWER_MESSAGE } from "@/src/constants/ai.constants";


const jsonSchema = {
  type: "object",
  properties: {
    result: { type: "string", description: "The single llm response" }
  },
  required: ["result"]
};

export async function getResponse(chatbotId:string, question:string, history:string[] = []) {
  console.log("Recieved the request");

  const topCandidates: any = await retrieveData(chatbotId, question);

  if (!topCandidates || topCandidates.length === 0) {
    return NO_ANSWER_MESSAGE;
  }

  const contentList = topCandidates.map(
    (candidate: any) => candidate.pageContent,
  );

  const llm = chatModel();

  const prompt = ChatPromptTemplate.fromMessages([["system", BRAIN_SYSTEM_PROMPT], ["human", "{question}"]])

  const formattedPrompt = await prompt.invoke({
    context: contentList.join("\n\n"),
    question,
    chat_history: history.join("\n\n"),
  });

  const structuredModel = llm.withStructuredOutput(jsonSchema, { name : "response"})
  const aiResponse = await structuredModel.invoke(formattedPrompt);
  return aiResponse.result
}
