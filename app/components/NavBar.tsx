// components/Navbar.tsx
import {
  Sparkles,
  User,
  Clock,
  ChevronDown,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import DeleteChatButton from "./DeleteChatButton";

import SupaBase from "@/lib/supaBase";

export default async function Navbar() {
  const supabase = SupaBase();
  const session = await getServerSession(authOptions);
  const userData = session?.user
  const user_name = (userData as any)?.name || "User"
  const user_email = (userData as any)?.email
  const user_id = (userData as any)?.id


  const { data } = await supabase.from('chats').select('session_id').eq('user_id', user_id)

  console.log(data)

  const uniqueUrls = Array.from(new Set(
    data?.map(item => item.session_id)
  ))

  const names = uniqueUrls.map((url: any) => {
    try {
      if (!url) return "Unknown";
      const hostname = new URL(url).hostname
      const cleanHost = hostname.replace(/^www\./, '');
      return cleanHost.split('.')[0];
    } catch (e) {
      console.error("Error parsing URL in NavBar:", url);
      return url || "Unknown";
    }
  })

  console.log(names)


  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-8">
          {/* LEFT SECTION: Brand + Inline History */}
          <div className="flex items-center gap-8 flex-1 overflow-hidden">
            {/* Logo: Heavy weight, tight tracking */}
            <div className="flex items-center gap-2.5 shrink-0 group cursor-pointer">
              <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all duration-300">
                <Sparkles size={20} className="text-white fill-current" />
              </div>
              <span className="text-xl font-[900] tracking-tighter text-slate-950 capitalize italic">
                Scrapcher<span className="text-amber-500 not-italic">.AI</span>
              </span>
            </div>

            {/* Desktop History: Improved Pill-based layout */}
            <div className="hidden lg:flex items-center gap-4 flex-1 overflow-hidden border-l border-slate-100 pl-8">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">
                <Clock size={14} className="text-amber-500/80" />
                <span>History</span>
              </div>

              <div className="flex gap-2.5 overflow-x-auto no-scrollbar items-center py-1 flex-1">
                {uniqueUrls.map((url: any, index: any) => (
                  <div key={index} className="group relative flex items-center shrink-0">
                    <Link
                      href={`/?url=${encodeURIComponent(url)}`}
                      className="h-9 px-4 flex items-center gap-2.5 text-[13px] font-bold text-slate-600 bg-slate-50/50 hover:bg-amber-50/80 hover:text-amber-700 border border-slate-200/50 hover:border-amber-200 rounded-xl transition-all duration-300 group-hover:pr-10 shadow-sm hover:shadow-md hover:shadow-amber-500/5"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-amber-500 group-hover:scale-125 transition-all duration-300" />
                      <span className="truncate max-w-[130px] capitalize tracking-tight">
                        {names[index]}
                      </span>
                    </Link>
                    <div className="absolute right-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 scale-75 group-hover:scale-100">
                      <DeleteChatButton sessionId={url} />
                    </div>
                  </div>
                ))}

                {uniqueUrls.length === 0 && (
                  <span className="text-xs font-medium text-slate-400 italic ml-2">No recent chats</span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: Global Actions */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-px h-6 bg-slate-200" />
            {/* Profile: Perfectly aligned vertical stack */}
            <div className="relative group">
              <div className="flex items-center gap-3 pl-1 cursor-pointer h-16">
                <div className="flex flex-col items-end shrink-0 select-none">
                  <span className="text-sm capitalize font-extrabold text-slate-900 leading-none mb-1 group-hover:text-amber-600 transition-colors">
                    {user_name}
                  </span>
                  <span className="text-[12px] text-amber-500/70 tracking-wide leading-none">
                    {user_email}
                  </span>
                </div>

                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:border-amber-300 transition-all shadow-sm overflow-hidden">
                    <User
                      size={18}
                      className="text-slate-500 group-hover:text-amber-500 transition-colors"
                    />
                  </div>
                  {/* Status Dot */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                </div>

                <ChevronDown
                  size={14}
                  className="text-slate-400 group-hover:text-slate-600 transition-transform duration-200 group-hover:rotate-180"
                />
              </div>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full -mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                <div className="py-1">
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUB-NAV: Only for small screens to prevent crowding the header */}
      <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-slate-50/50 border-t border-slate-100 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">
          Recent:
        </span>
        <div className="flex gap-2 items-center">
          {uniqueUrls.map((url: any, index: any) => (
            <Link
              key={index}
              href={`/?url=${encodeURIComponent(url)}`}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[12px] font-semibold text-slate-600 whitespace-nowrap shadow-sm active:bg-amber-50 active:text-amber-700 transition-colors"
            >
              {names[index]}
            </Link>
          ))}
          {uniqueUrls.length === 0 && (
            <span className="text-[10px] text-slate-400 italic">No history</span>
          )}
        </div>
      </div>
    </header>
  );
}
