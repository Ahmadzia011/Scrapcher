"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import type { registerUser } from "../actions/registerUser.actions";

export default function RegisterCard({
  registerAction,
}: {
  registerAction: typeof registerUser;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    const result = await registerAction(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-130 w-full max-w-md flex-col overflow-hidden rounded-2xl border border-(--border-color) bg-white shadow-lg">
      <div className="px-10 pt-9">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold tracking-tight text-(--secondary-color)">
            Sign up to Scrapcher
          </h1>

          <p className="mt-2 text-sm text-(--tertiary-color)">
            Create your account to continue
          </p>
        </div>

        <div className="my-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-(--border-color)" />
        </div>
      </div>

      <form action={handleSubmit} className="px-10">
        {error && (
          <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-(--secondary-color)"
            >
              Full name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="John Doe"
              className="h-10 w-full rounded-md border border-(--border-color) bg-white px-3 text-sm text-(--secondary-color) outline-none transition placeholder:text-(--tertiary-color) focus:border-(--secondary-color)"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-(--secondary-color)"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="name@company.com"
              className="h-10 w-full rounded-md border border-(--border-color) bg-white px-3 text-sm text-(--secondary-color) outline-none transition placeholder:text-(--tertiary-color) focus:border-(--secondary-color)"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-(--secondary-color)"
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
            className="mt-4 h-10 w-full rounded-md bg-(--secondary-color) text-sm font-medium text-white shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Continue"}
          </button>
        </div>
      </form>

      <div className="mt-auto border-t border-(--border-color) bg-(--primary-color) px-10 py-5">
        <p className="text-center text-sm text-(--tertiary-color)">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-(--secondary-color) transition-opacity hover:opacity-60"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
