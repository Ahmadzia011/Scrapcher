"use server";
import { revalidatePath } from "next/cache";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import LLM from "@/lib/LLM";
import { Retriever } from "@/lib/retriever";
import SupaBase from "@/lib/supaBase";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function Brain(url: any, question: any) {
  console.log("Recieved the request");
  revalidatePath("/"); // Trigger immediate refresh of Navbar and other server components

  const session = await getServerSession(authOptions)
  const supabase = SupaBase();
  const user = session?.user
  const user_id = (user as any)?.id


  // Normalize URL to origin for database consistency
  let normalizedUrl = url;
  try {
    normalizedUrl = new URL(url).origin;
  } catch (e) {
    console.warn("Invalid URL in Brain, using raw:", url);
  }

  const { data: existing_chat } = await supabase.from("chats")
    .select('query, ai_response, created_at')
    .eq('session_id', normalizedUrl)
    .order('created_at', { ascending: false })
    .limit(5)
  const chat_history = JSON.stringify(existing_chat)

  const top_candidates: any = await Retriever(normalizedUrl, question);
  const contentList = top_candidates?.map(
    (candidate: { content: any }) => candidate.content,
  );

  const llm = LLM();


  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `### ROLE
    You are a precise Knowledge Retrieval Engine. Deliver high-density, accurate responses using ONLY the provided data and with politness.

    ### STRICT OPERATIONAL CONSTRAINTS
    1. SOURCE LIMIT: Use ONLY the provided <context>. No outside knowledge. No hallucinations.
    2. FAILURE STATE: If <context> is insufficient, say exactly: "I cannot answer this due to insufficient context." 
    3. BREVITY: Be extremely concise. Get straight to the point. Eliminate fluff, introductory filler, and conversational bridge phrases (e.g., "Sure," "Based on...", "I found...").
    4. TIME: Never mention current time/date unless explicitly requested.
    5. REPETITION: Do not repeat the previous response.
    6- SECURITY: Do not ever give the internal context to the user.

    ### GROUNDING PROTOCOL
    - Treat the <context> as your entire world. 
    - Claims must have a direct mapping to a sentence in the <context>.
    - State facts directly. Do not meta-comment on the source.

    ### DATA INPUTS
    <context>
    {context}
    </context>

    <chat_history>
    {chat_history}
    </chat_history>

    ### FORMATTING & LANGUAGE
    - NON-ENGLISH SOURCE: If <context> is not English, translate the answer to English and append "(Original Language: [Name])".
    - TIME FORMAT: Always use 12-hour format (e.g., 11:45 AM).
    - CHRONOLOGY: Use the history to resolve "when" questions based on conversation flow.`

    ],
    ["human", "{question}"],
  ]);


  const formattedPrompt = await prompt.invoke({
    context: contentList.join("\n\n"),
    question,
    chat_history
  });

  const ai_response = await llm.invoke(formattedPrompt);


  const { error } = await supabase.from("chats").insert({
    query: question,
    ai_response: ai_response.content,
    session_id: normalizedUrl,
    user_id
  });

  if (error) {
    console.error('Error in insertion!', error)
  }
  return ai_response.content;
}
