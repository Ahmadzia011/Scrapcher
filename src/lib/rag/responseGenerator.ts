import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import chatModel from "@/src/lib/chat-model";
import { retrieveData } from "./retriever";
import { BRAIN_SYSTEM_PROMPT } from "@/src/constants/ai.constants";

export async function getResponse(chatbotId: any, question: any, history: any[] = []) {
  console.log("Recieved the request");

  console.log(chatbotId, question)
  const topCandidates: any = await retrieveData(chatbotId, question);

  if (!topCandidates || topCandidates.length === 0) {
    return "I cannot answer this due to insufficient context.";
  }

  const contentList = topCandidates.map(
    (candidate: any) => candidate.pageContent,
  );

  const llm = chatModel();

  const messages: any[] = [
    ["system", BRAIN_SYSTEM_PROMPT],
  ];

  if (history && Array.isArray(history)) {
    history.forEach((msg) => {
      messages.push([msg.role === "user" ? "human" : "ai", msg.content]);
    });
  }

  messages.push(["human", "{question}"]);

  const prompt = ChatPromptTemplate.fromMessages(messages);

  const chain = prompt.pipe(llm).pipe(new StringOutputParser());

  const aiResponse = await chain.invoke({
    context: contentList.join("\n\n"),
    question,
  });

  return aiResponse;
}
