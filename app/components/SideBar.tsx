import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import SupaBase from "@/lib/supaBase";
import { Clock, MessageSquare, Plus } from "lucide-react";

export default async function SideBar() {
  const supabase = SupaBase();
  const session = await getServerSession(authOptions);
  const userData = session?.user;
  const user_id = (userData as any)?.id;

  const { data } = await supabase
    .from("chats")
    .select("session_id")
    .eq("user_id", user_id);

  const uniqueUrls = Array.from(new Set(data?.map((item) => item.session_id)));

  const names = uniqueUrls.map((url: any) => {
    try {
      if (!url) return "Unknown";
      const hostname = new URL(url).hostname;
      const cleanHost = hostname.replace(/^www\./, "");
      return cleanHost.split(".")[0];
    } catch (e) {
      return url || "Unknown";
    }
  });

  return (
    <aside className="w-80 border-r border-slate-200/60 bg-[#FDFCFB] flex flex-col h-full shrink-0">
      {/* Sidebar Action */}
      <div className="p-6">
        {/* We use a standard <a> tag instead of <Link> for "New Chat" 
            to force a full page reload and clear all ChatBox states. */}
        <a
          href="/"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
        >
          <Plus size={16} strokeWidth={3} />
          New Chat
        </a>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3 space-y-1">
        <div className="flex items-center gap-2 px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
          <Clock size={12} className="text-amber-500" />
          Recent Chats
        </div>

        {uniqueUrls.map((url: any, index: any) => (
          <div key={index} className="group relative">
            <Link
              href={`/?url=${encodeURIComponent(url)}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100/50 flex items-center justify-center shrink-0 group-hover:bg-amber-50 group-hover:border-amber-100 border border-transparent transition-colors">
                <MessageSquare
                  size={14}
                  className="text-slate-400 group-hover:text-amber-500 transition-colors"
                />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[13px] font-bold text-slate-700 capitalize truncate leading-tight group-hover:text-slate-900 transition-colors">
                  {names[index]}
                </span>
                <span className="text-[10px] text-slate-400 truncate font-medium">
                  {url}
                </span>
              </div>
            </Link>
          </div>
        ))}

        {uniqueUrls.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center opacity-50">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-3">
              <Clock size={20} className="text-slate-200" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              No History
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
