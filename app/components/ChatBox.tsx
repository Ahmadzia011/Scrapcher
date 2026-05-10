"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { Globe, Send, Plus } from "lucide-react";
import { Brain } from "../actions/brain";
import { storer } from "@/lib/storer";
import { isUrlScraped } from "@/lib/storer";
import { useRouter, useSearchParams } from "next/navigation";
import Markdown from 'react-markdown';
import { getChatHistory } from "../actions/chatHistory";

function ChatContent() {

  //It is used to read the key value pairs (content to url after "?")
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlParam = searchParams.get("url")
  const [query, setQuery] = useState("");
  const [existingSite, setExistingSite] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isUrlPasted, setIsUrlPasted] = useState(false);
  const [scrapingDone, setScrapingDone] = useState(false);
  const [url, setUrl] = useState("");
  const [urlCopy, setUrlCopy] = useState("");
  const [summary, setSummary] = useState("");
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  // Single Source of Truth States
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [isResultLoading, setIsResultLoading] = useState(false);
  const [optimisticQuery, setOptimisticQuery] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isResultLoading]);

  const loadHistory = async (targetUrl: string) => {
    if (chatHistory.length === 0) setIsHistoryLoading(true);
    try {
      const history = await getChatHistory(targetUrl);
      setChatHistory(history);
    } catch (e) {
      console.error("Error loading history:", e);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const fetchSummary = async (targetUrl: string) => {
    setIsSummaryLoading(true);
    setSummary("");
    try {
      const res = await Brain(targetUrl, "Give me a brief summary of this website in 2-3 sentences.");
      setSummary(String(res));
      router.refresh(); // Refresh Navbar to show new site
    } catch (e) {
      console.error("Error fetching summary:", e);
    } finally {
      setIsSummaryLoading(false);
    }
  };

  useEffect(() => {
    if (urlParam) {
      setUrlCopy(urlParam);
      setExistingSite(true);
      setError("This site is already scraped");
      setIsUrlPasted(true);
      setScrapingDone(true);

      // We load the history first
      loadHistory(urlParam);
    }
  }, [urlParam]);

  const handleNewChat = () => {
    setQuery("");
    setExistingSite(false);
    setError("");
    setIsError(false);
    setIsUrlPasted(false);
    setScrapingDone(false);
    setUrl("");
    setUrlCopy("");
    setSummary("");
    setChatHistory([]);
  };

  const doScraping = async () => {
    if (!url) {
      setIsError(true);
      setError("Please enter a URL");
      return;
    }

    setUrlCopy(url);
    setIsError(false);
    setUrl("");

    try {
      const urlScraped: any = await isUrlScraped(url);

      if (urlScraped > 0) {
        setExistingSite(true);
        setError("This site is already scraped");
        setScrapingDone(true);
        loadHistory(url);
        return;
      }
      const scrap_result = await storer(url);
      if (scrap_result == "error") {
        throw new Error("Scraper or Embeder raised an issue...");
      }
      setScrapingDone(true);
      fetchSummary(url);
    } catch (error: any) {
      setIsError(true);
      setError(error.message);
    }
  };

  const handleSend = async () => {
    if (!query) return;
    const currentQuery = query;
    setQuery("");
    setOptimisticQuery(currentQuery);
    setIsResultLoading(true)
    try {
      // Send to DB via Brain
      await Brain(urlCopy, currentQuery);

      // Fetch fresh history
      await loadHistory(urlCopy);
    } catch (error: any) {
      console.log("Got error!");
      setIsError(true);
      setError(error.message);
    } finally {
      setIsResultLoading(false);
      setOptimisticQuery("");
      router.refresh();
    }
  };

  let showHero = chatHistory.length === 0 && !isUrlPasted && !isError;
  let showLoading = chatHistory.length === 0 && !scrapingDone;
  let showQuery = !isError && isUrlPasted && !showLoading

  // Filter out the summary request from the visible chat history
  const visibleChatHistory = chatHistory.filter(
    (chat) => !chat.query.includes("Give me a brief summary of this website in 2-3 sentences")
  );

  return (
    <main className="flex-1 flex flex-col relative overflow-hidden">

   
      {/* ---------------- Hero Section --------------- */}

      {showHero ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-700">
          <h1 className="text-5xl md:text-7xl font-black font-serif italic text-slate-900 mb-6 tracking-tighter">
            What are we <span className="text-amber-500">learning</span> today?
          </h1>
          <p className="text-slate-400 max-w-lg text-xl font-serif leading-relaxed font-medium">
            Paste a URL and let's synthesize the data into instant, factual
            answers.
          </p>
        </div>
      ) : (

        // {/* ------ Main Section of chat -------- */}
        <section className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-3xl mx-auto">
          

              {isUrlPasted && showLoading && !existingSite ? (
                <div className="flex items-center justify-center py-12">
                  <div>
                    {isError ? (
                      <div className="flex items-start gap-3 px-5 py-4 bg-red-50 border border-red-100 rounded-2xl text-red-500 text-sm font-mono tracking-wide">
                        <span className="w-2 h-2 mt-[6px] animate-pulse rounded-full bg-red-400 shrink-0" />
                        {error} <br /> Enter a new URL..
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-8 py-4">
                        <div className="relative w-16 h-16">
                          <div className="absolute inset-0 border-2 border-amber-500/5 rounded-full" />
                          <div className="absolute inset-0 border-2 border-t-amber-500 rounded-full animate-spin [animation-duration:1.5s]" />
                          <div className="absolute inset-2 border border-slate-100 rounded-full animate-reverse-spin [animation-duration:3s]" />
                          <div className="absolute inset-5 bg-amber-500 rounded-xl animate-pulse opacity-40 shadow-[0_0_20px_rgba(245,158,11,0.3)]" />
                        </div>

                        <div className="flex flex-col items-center gap-3">
                          <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.4em] animate-pulse pl-1">
                            Processing
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : !isError ? (
                <div className="p-4 md:p-8 flex flex-col gap-8">
                  {/* Summary Box (Only show if we have it and it's early in the chat) */}
                  {(isSummaryLoading || summary) && visibleChatHistory.length === 0 && !isResultLoading && (
                    <div className="w-full p-8 bg-amber-50/20 rounded-3xl border border-amber-100/50 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/20" />
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-amber-500/10">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600/80 flex items-center gap-2">
                          <Plus size={10} strokeWidth={3} /> Quick Summary
                        </h4>
                      </div>
                      {isSummaryLoading ? (
                        <div className="space-y-2">
                          <div className="h-3 bg-amber-100/50 rounded-full w-full animate-pulse" />
                          <div className="h-3 bg-amber-100/50 rounded-full w-5/6 animate-pulse" />
                        </div>
                      ) : (
                        <p className="text-stone-600 text-[15px] leading-relaxed font-serif tracking-[0.2px]">{summary}</p>
                      )}
                    </div>
                  )}

                  {/* Render Chat History */}
                  {isHistoryLoading ? (
                    <div className="h-3 bg-stone-100 rounded-full w-1/3 animate-pulse m-8" />
                  ) : (
                    visibleChatHistory.map((chat, index) => (
                      <div key={index} className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* User Query Bubble */}
                        <div className="flex justify-end">
                          <div className="max-w-[85%] bg-stone-50 border border-stone-200 px-6 py-4 rounded-2xl rounded-tr-none shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                            <p className="text-[14px] font-bold text-slate-800 leading-relaxed tracking-wide">
                              {chat.query}
                            </p>
                          </div>
                        </div>

                        {/* AI Response Box */}
                        <div className="flex justify-start">
                          <div className="w-full bg-white p-8 rounded-3xl rounded-tl-none border-l-4 border-l-amber-500 border border-stone-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] relative transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                            <div className="text-stone-700 text-[15.5px] leading-relaxed font-serif tracking-wide">
                              <Markdown>{chat.ai_response}</Markdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  {/* Optimistic Loading State for New Query */}
                  {isResultLoading && optimisticQuery && (
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex justify-end">
                        <div className="max-w-[85%] bg-stone-50 border border-stone-200 px-6 py-4 rounded-2xl rounded-tr-none shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                          <p className="text-[14px] font-bold text-slate-800 leading-relaxed tracking-wide">
                            {optimisticQuery}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="space-y-2 w-full p-8 bg-white rounded-3xl border border-stone-100 shadow-sm rounded-tl-none border-l-4 border-l-amber-500">
                          <div className="h-3 bg-stone-100 rounded-full w-full animate-pulse" />
                          <div className="h-3 bg-stone-100 rounded-full w-5/6 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Auto-scroll anchor */}
                  <div ref={scrollRef} />
                </div>
              ) : (
                <div className="flex items-start gap-3 px-5 py-4 bg-red-50 border border-red-100 rounded-2xl text-red-500 text-sm font-mono tracking-wide m-8">
                  <span className="w-2 h-2 mt-[6px] animate-pulse rounded-full bg-red-400 shrink-0" />
                  {error || "An error occurred"}
                </div>
              )}
            </div>
        </section>
      )}

      {/* ---------- Footer section for url and questions ----------- */}
      <footer className="p-8 md:p-14 bg-gradient-to-t from-[#FDFCFB] via-[#FDFCFB] to-transparent">
        <div className="max-w-3xl mx-auto relative group">

          {/* // ------------- Input Box -------------- */}
          <div className="relative flex items-center gap-3 bg-white border-2 border-slate-100 focus-within:border-amber-500 p-2 pl-6 rounded-[1.0rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300">
            {isUrlPasted ? (
              <button
                onClick={handleNewChat}
                className="p-2.5 text-stone-400 hover:text-amber-500 cursor-pointer hover:bg-stone-50 rounded-xl transition-all duration-200 flex items-center justify-center shrink-0 group/newchat"
                title="New Chat"
              >
                <Plus size={20} />
              </button>
            ) :
              (
                <Globe />
              )}

            <p className="w-[0.5px] bg-stone-200 h-6 text-stone-500 mx-1"></p>
            <input
              value={showQuery ? query : url}
              onChange={
                showQuery
                  ? (e) => setQuery(e.target.value)
                  : (e) => setUrl(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  if (showQuery) {
                    handleSend();
                  } else if (url) {
                    doScraping();
                    setIsUrlPasted(true);
                  }
                }
              }}
              type="text"
              placeholder={
                showQuery
                  ? "Drop your question...."
                  : "Paste the URL"
              }
              className="flex-1 bg-transparent outline-none px-4 h-14 text-[15px] pt-1 text-stone-800 placeholder:text-stone-300 font-medium"
            />

            <button
              onClick={
                showQuery
                  ? () => {
                    handleSend();
                  }
                  : () => {
                    if (!url) return;
                    doScraping();
                    setIsUrlPasted(true);
                  }
              }
              className="m-1.5 px-5 h-11 bg-amber-500 hover:bg-amber-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl flex items-center gap-2 transition-all duration-150 shrink-0 shadow-sm shadow-amber-200 cursor-pointer"
            >
              <Send size={15} strokeWidth={2} />
              {showQuery ? "Ask" : "Analyze"}
            </button>
          </div>
        </div>

        {/* Tech Stack Indicators */}
        <div className="flex justify-center gap-10 mt-8">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.25em]">
            <span className="w-2 h-2 rounded-full bg-green-500" /> Groq Llama
            3.1
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.25em]">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Supabase DB
          </div>
        </div>
      </footer>

    </main>
  );
}

export default function ChatBox() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}
