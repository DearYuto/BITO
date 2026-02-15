"use client";

import { useState } from "react";
import { apiBaseUrl } from "@/lib/config";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          (data && (data.message || data.error)) || "Login failed.";
        throw new Error(
          typeof message === "string" ? message : "Login failed.",
        );
      }

      const token = data?.accessToken ?? null;

      if (!token) {
        throw new Error("Login succeeded but no access token returned.");
      }

      localStorage.setItem("accessToken", token);
      setSuccess("Logged in successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="space-y-4"
      data-testid="login-form"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label
          className="text-sm font-medium text-[var(--color-text-main)]"
          htmlFor="email"
        >
          Email
        </label>
        <input
          data-testid="login-email"
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-main)] shadow-sm outline-none transition focus:border-[var(--color-brand-500)] focus:ring-2 focus:ring-[var(--color-brand-100)]"
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-[var(--color-text-main)]"
          htmlFor="password"
        >
          Password
        </label>
        <input
          data-testid="login-password"
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-main)] shadow-sm outline-none transition focus:border-[var(--color-brand-500)] focus:ring-2 focus:ring-[var(--color-brand-100)]"
        />
      </div>

      {error ? (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
          data-testid="login-error"
        >
          {error}
        </div>
      ) : null}

      {success ? (
        <div
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200"
          data-testid="login-success"
        >
          {success}
        </div>
      ) : null}

      <button
        data-testid="login-submit"
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[var(--color-brand-500)] to-[var(--color-brand-700)] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_28px_-14px_rgba(58,141,255,0.8)] transition hover:from-[var(--color-brand-300)] hover:to-[var(--color-brand-500)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
