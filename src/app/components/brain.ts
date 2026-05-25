import { ChatPromptTemplate } from "@langchain/core/prompts";
import LLM from "@/src/lib/chat-model";
import { Retriever } from "@/src/app/components/retriever";
import { BRAIN_SYSTEM_PROMPT } from "@/src/constants/brain";

export async function Brain(chatbot_id: any, question: any) {
  console.log("Recieved the request");

  console.log(chatbot_id, question)
  const top_candidates: any = await Retriever(chatbot_id, question);

  
  const contentList = top_candidates?.map(
    (candidate: { content: any }) => candidate.content,
  );

  const llm = LLM();


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

  const ai_response = await llm.invoke(formattedPrompt);


  return ai_response.content;
}
