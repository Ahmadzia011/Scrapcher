import { ChatPromptTemplate } from "@langchain/core/prompts";
import chatModel from "@/src/lib/chat-model";
import { retrieveData } from "./retriever";
import { BRAIN_SYSTEM_PROMPT, NO_ANSWER_MESSAGE } from "@/src/constants/ai.constants";



export async function getResponse(chatbotId:string, question:string, history:string[] = []) {
  console.log("Recieved the request");

  const llm = chatModel(); 

  const topCandidates: any = await retrieveData(chatbotId, question);

  if (!topCandidates || topCandidates.length === 0) {
    return NO_ANSWER_MESSAGE;
  }

  const contentList = topCandidates.map(
    (candidate: any) => candidate.pageContent,
  );

  const prompt = ChatPromptTemplate.fromMessages([["system", BRAIN_SYSTEM_PROMPT], ["human", "{question}"]]) // this creates a structured prompt with roles instead of sending one giant string to llm

  const formattedPrompt = await prompt.invoke({ // this fills up our prompt template with actual data.
    context: contentList.join("\n\n"),
    question,
    chat_history: history.join("\n\n"),
  });

  const aiResponse = await llm.invoke(formattedPrompt);
  return aiResponse.content
}
