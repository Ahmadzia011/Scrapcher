"use client";

import { registerUser } from "../actions/register";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function clientAction(formData: FormData) {
    setIsLoading(true);
    setError(null);
    const result = await registerUser(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black font-serif italic text-slate-900 mb-4 tracking-tighter fade-in">
            Join <span className="text-amber-500">Scrapcher</span>.
          </h1>
          <p className="text-slate-400 font-serif font-medium text-lg">
            Enter your details to get started
          </p>
        </div>

        <form action={clientAction}>
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="John Doe"
                className="w-full bg-transparent border border-slate-200 focus:border-amber-500 rounded-lg px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition-all ring-0 focus:ring-4 focus:ring-amber-500/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="name@company.com"
                className="w-full bg-transparent border border-slate-200 focus:border-amber-500 rounded-lg px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition-all ring-0 focus:ring-4 focus:ring-amber-500/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full bg-transparent border border-slate-200 focus:border-amber-500 rounded-lg px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition-all ring-0 focus:ring-4 focus:ring-amber-500/10"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-amber-500 hover:bg-amber-600 cursor-pointer text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-2"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>

          <div className="mt-8 text-center">
            <Link href="/login" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
              Already have an account? <span className="text-amber-600 font-medium hover:underline underline-offset-4">Sign in</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}