"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { askAssistant } from "@/src/app/actions/chatPreview.actions";
import { WidgetConfig } from "@/src/constants/primary-dashboard.constants";

type Message = { role: "user" | "assistant"; content: string };

// Chat state lives here, in the component's own useState — it survives
// closing the modal (we only hide it, never unmount) and is cleared for
// good on a page reload. Nothing is persisted to a database.
export default function DemoChatModal({
  widget,
  chatbotId,
  isOpen,
  onClose,
}: {
  widget: WidgetConfig;
  chatbotId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI assistant. Ask me anything about this website.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  async function handleSend(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!input.trim() || isSending) return;

    const question = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setIsSending(true);

    try {
      const history = messages.slice(-10).map((m) => `${m.role}: ${m.content}`);
      const answer = await askAssistant(chatbotId, question, history);
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 items-center justify-center bg-black/40 p-4 ${
        isOpen ? "flex" : "hidden"
      }`}
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-(--border-color) bg-white shadow-2xl"
        style={{ height: "min(640px, 90vh)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between gap-3 border-b border-(--border-color) px-5 py-4">
          <div className="flex items-center gap-3">
            <div
              className="grid h-9 w-9 place-items-center rounded-lg text-sm font-bold text-white"
              style={{ backgroundColor: widget.accentColor }}
            >
              {(widget.name || "A").charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-semibold text-(--secondary-color)">
                {widget.name || "Assistant"}
              </div>
              <div className="text-xs text-(--tertiary-color)">Live demo</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-(--tertiary-color) hover:bg-(--primary-color)"
            aria-label="Close demo"
          >
            <X size={16} />
          </button>
        </div>

        {/* MEMORY-ONLY NOTICE */}
        <p className="border-b border-(--border-color) bg-(--primary-color) px-5 py-2 text-[11px] italic text-(--tertiary-color)">
          This demo isn't saved anywhere — it lives only in this browser tab
          and resets when you reload the page.
        </p>

        {/* BODY */}
        <div
          ref={bodyRef}
          className="flex flex-1 flex-col gap-3 overflow-y-auto p-5"
          style={{ backgroundColor: widget.backgroundColor }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user" ? "ml-auto text-white" : ""
              }`}
              style={
                m.role === "user"
                  ? { backgroundColor: widget.accentColor }
                  : { backgroundColor: widget.panelColor, color: widget.textColor }
              }
            >
              {m.content}
            </div>
          ))}

          {isSending && (
            <div
              className="w-fit max-w-[80%] rounded-xl px-4 py-2.5"
              style={{ backgroundColor: widget.panelColor, color: widget.textColor }}
            >
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
              </span>
            </div>
          )}
        </div>

        {/* INPUT */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 border-t border-(--border-color) p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="h-11 w-full rounded-lg border border-(--border-color) bg-(--primary-color) px-4 text-sm text-(--secondary-color) outline-none placeholder:text-(--tertiary-color)"
          />
          <button
            type="submit"
            disabled={!input.trim() || isSending}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-white disabled:opacity-50"
            style={{ backgroundColor: widget.accentColor }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
