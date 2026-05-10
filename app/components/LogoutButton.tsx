"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-amber-600 cursor-pointer transition-colors"
        >
            <LogOut size={16} />
            <span>Log out</span>
        </button>
    );
}
