"use server";
import SupaBase from "@/lib/supaBase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getChatHistory(url: string) {
  const session = await getServerSession(authOptions);
  const user_id = (session?.user as any)?.id;

  if (!user_id) return [];

  const supabase = SupaBase();

  let normalizedUrl = url;
  try {
    normalizedUrl = new URL(url).origin;
  } catch (e) {
    console.warn("Invalid URL in getChatHistory, using raw:", url);
  }

  // Fetch all chats for this URL and User, ordered by creation time
  const { data, error } = await supabase
    .from("chats")
    .select("query, ai_response, created_at")
    .eq("session_id", normalizedUrl)
    .eq("user_id", user_id)
    .order("created_at", { ascending: true }); // true = oldest first

  if (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }

  return data || [];
}
