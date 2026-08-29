"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import crypto from "crypto";
import { EyeOff, Eye } from "lucide-react";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const result = await signIn("credentials", {
      email,
      password: hashedPassword,
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
    <div className="relative h-120 w-full max-w-md overflow-hidden rounded-2xl border border-(--border-color) bg-white shadow-lg">
      <div className="px-10 pt-12">
        <div className="mb-8 text-center">
          <h1 className="text-xl font-semibold tracking-tight text-(--secondary-color)">
            Sign in to Scrapcher
          </h1>

          <p className="mt-2 text-sm text-(--tertiary-color)">
            Welcome back! Please sign in to continue
          </p>
        </div>

        <div className="mb-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-(--border-color)" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-10">
        {error && (
          <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-(--secondary-color)"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10 w-full rounded-md border border-(--border-color) bg-white px-3 text-sm text-(--secondary-color) outline-none transition placeholder:text-(--tertiary-color) focus:border-(--secondary-color)"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-(--secondary-color)"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-10 w-full rounded-md border border-(--border-color) bg-white px-3 pr-12 text-sm text-(--secondary-color) outline-none transition placeholder:text-(--tertiary-color) focus:border-(--secondary-color)"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-(--tertiary-color) transition hover:text-(--secondary-color)"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-3 h-10 w-full rounded-md bg-(--secondary-color) text-sm font-medium text-white shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Continue"}
          </button>
        </div>
      </form>

      <div className="absolute inset-x-0 bottom-0 border-t border-(--border-color) bg-(--primary-color) px-10 py-5">
        <p className="text-center text-sm text-(--tertiary-color)">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-(--secondary-color) transition-opacity hover:opacity-60"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
