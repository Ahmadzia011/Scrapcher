"use client";

import { X } from "lucide-react";
import { deleteChat } from "../actions/deleteChat";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteChatButton({ sessionId }: { sessionId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (confirm("Are you sure you want to delete this chat and its scraped data?")) {
      setIsDeleting(true);
      try {
        const result = await deleteChat(sessionId);
        if (result.success) {
          router.push("/"); // Take user to new chat
          router.refresh(); // Force navbar refresh
        }
      } catch (error) {
        console.error("Failed to delete chat:", error);
        alert("Failed to delete chat");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="ml-1 p-1 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
      title="Delete chat"
    >
      <X size={12} className={isDeleting ? "animate-spin" : ""} />
    </button>
  );
}
