"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
      setIsLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black font-serif italic text-slate-900 mb-4 tracking-tighter fade-in">
            Welcome <span className="text-amber-500">back</span>.
          </h1>
          <p className="text-slate-400 font-serif font-medium text-lg">
            Please enter your details to sign in
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full bg-transparent border border-slate-200 focus:border-amber-500 rounded-lg px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition-all ring-0 focus:ring-4 focus:ring-amber-500/10"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-transparent border border-slate-200 focus:border-amber-500 rounded-lg px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition-all ring-0 focus:ring-4 focus:ring-amber-500/10"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-amber-500 hover:bg-amber-600 cursor-pointer text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-2"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </div>

          <div className="mt-8 text-center">
            <Link href="/register" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
              Don't have an account? <span className="text-amber-600 font-medium hover:underline underline-offset-4">Sign up</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}