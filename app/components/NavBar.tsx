// components/Navbar.tsx
import {
  Sparkles,
  User,
  ChevronDown,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const userData = session?.user;
  const user_name = (userData as any)?.name || "User";
  const user_email = (userData as any)?.email;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-[#FDFCFB]/90 backdrop-blur-md">
      <div className="px-10">
        <div className="flex h-20 items-center justify-between gap-8">
          {/* LEFT SECTION: Brand */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 shrink-0 group cursor-pointer select-none">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all duration-300">
                <Sparkles size={22} className="text-white fill-current" />
              </div>
              <span className="text-2xl font-[900] tracking-tighter text-slate-900 capitalize italic">
                Scrapcher<span className="text-amber-500 not-italic">.AI</span>
              </span>
            </div>
          </div>

          {/* RIGHT SECTION: Global Actions */}
          <div className="flex items-center gap-6 shrink-0">
            {/* Profile */}
            <div className="relative group">
              <div className="flex items-center gap-3 cursor-pointer h-16 group/profile">
                <div className="flex flex-col items-end shrink-0 select-none">
                  <span className="text-sm font-bold text-slate-900 leading-none mb-1 group-hover/profile:text-amber-600 transition-colors">
                    {user_name}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium tracking-tight leading-none">
                    {user_email}
                  </span>
                </div>

                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover/profile:border-amber-400 transition-all shadow-sm overflow-hidden">
                    <User
                      size={18}
                      className="text-slate-400 group-hover/profile:text-amber-500 transition-colors"
                    />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>

                <ChevronDown
                  size={14}
                  className="text-slate-400 group-hover/profile:text-slate-600 transition-transform duration-300 group-hover/profile:rotate-180"
                />
              </div>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full -mt-2 w-52 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                <div className="py-1">
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
