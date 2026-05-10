"use server";
import SupaBase from "@/lib/supaBase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function deleteChat(sessionId: string) {
  const session = await getServerSession(authOptions);
  const user_id = (session?.user as any)?.id;

  if (!user_id) throw new Error("Unauthorized");

  const supabase = SupaBase();

  // 1. Delete all chats for this session and user
  const { error: chatError } = await supabase
    .from("chats")
    .delete()
    .eq("session_id", sessionId)
    .eq("user_id", user_id);

  if (chatError) {
    console.error("Error deleting chats:", chatError);
    return { success: false, error: chatError.message };
  }

  // 2. Delete all document embeddings for this specific URL/session
  // Since our 'documents' table likely uses 'url' as the identifier
  const { error: docError } = await supabase
    .from("documents")
    .delete()
    .eq("url", sessionId);

  if (docError) {
    console.error("Error deleting documents:", docError);
    // We don't necessarily want to fail the whole operation if document deletion fails
    // but it's good to log.
  }

  revalidatePath("/");
  return { success: true };
}
