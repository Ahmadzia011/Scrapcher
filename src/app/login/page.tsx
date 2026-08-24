"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import crypto from "crypto";
import { EyeOff, Eye } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false)

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden  px-5 py-10 bg-linear-to-b from-(--primary-color) from-0% via-[#DAE3ED] via-74% to-[#B7CAE0] to-100%">
      {/* Sky blue gradient */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full " />

      <div className="relative w-full max-w-sm">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm text-(--tertiary-color)">
            [ WELCOME BACK ]
          </p>

          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tighter text-(--secondary-color) md:text-5xl">
            Welcome back.
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-(--tertiary-color) md:text-base">
            Please enter your details to sign in.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-(--secondary-color)"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 w-full rounded-xl border border-(--border-color) bg-white px-4 text-sm text-(--secondary-color) outline-none transition placeholder:text-(--tertiary-color) focus:border-(--secondary-color)"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-(--secondary-color)"
              >
                Password
              </label>

            <div className="flex">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 w-full rounded-xl border border-(--border-color) bg-white px-4 text-sm text-(--secondary-color) outline-none transition placeholder:text-(--tertiary-color) focus:border-(--secondary-color)"
              />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="-ml-10 text-(--tertiary-color) transition hover:text-(--secondary-color)"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-xl bg-(--secondary-color) text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </div>

          {/* Register */}
          <p className="mt-8 text-center text-sm text-(--tertiary-color)">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-(--secondary-color) underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}