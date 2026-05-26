import { ChatPromptTemplate } from "@langchain/core/prompts";
import chatModel from "@/src/lib/chat-model";
import { retrieveData } from "./retriever";
import { BRAIN_SYSTEM_PROMPT } from "@/src/constants/ai.constants";

export async function getResponse(chatbotId: any, question: any) {
  console.log("Recieved the request");

  console.log(chatbotId, question)
  const topCandidates: any = await retrieveData(chatbotId, question);

  
  const contentList = topCandidates?.map(
    (candidate: { content: any }) => candidate.content,
  );

  const llm = chatModel();


  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      BRAIN_SYSTEM_PROMPT,
    ],
    ["human", "{question}"],
  ]);


  const formattedPrompt = await prompt.invoke({
    context: contentList.join("\n\n"),
    question,
  });

  const aiResponse = await llm.invoke(formattedPrompt);


  return aiResponse.content;
}
