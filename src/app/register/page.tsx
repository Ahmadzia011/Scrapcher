"use client";

import { registerUser } from "../actions/registerUser.actions";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    const result = await registerUser(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-(--primary-color) px-5 py-10">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#78AEFF]/20 blur-3xl" />

      <div className="relative w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm text-(--tertiary-color)">
            [ GET STARTED ]
          </p>

          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tighter text-(--secondary-color) md:text-5xl">
            Join Scrapcher.
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-(--tertiary-color) md:text-base">
            Create your account and get started.
          </p>
        </div>

        <form action={handleSubmit}>
          {error && (
            <div className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-(--secondary-color)"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                className="h-12 w-full rounded-xl border border-(--border-color) bg-white px-4 text-sm text-(--secondary-color) outline-none transition placeholder:text-(--tertiary-color) focus:border-(--secondary-color)"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-(--secondary-color)"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@company.com"
                className="h-12 w-full rounded-xl border border-(--border-color) bg-white px-4 text-sm text-(--secondary-color) outline-none transition placeholder:text-(--tertiary-color) focus:border-(--secondary-color)"
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="h-12 w-full rounded-xl border border-(--border-color) bg-white px-4 pr-12 text-sm text-(--secondary-color) outline-none transition placeholder:text-(--tertiary-color) focus:border-(--secondary-color)"
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
              className="mt-2 h-12 w-full rounded-xl bg-(--secondary-color) text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-(--tertiary-color)">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-(--secondary-color) underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}