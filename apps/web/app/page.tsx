"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { apiBaseUrl } from "../lib/config";

type BalanceItem = {
  asset: string;
  available: string | number;
};

export default function Home() {
  const [balances, setBalances] = useState<BalanceItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadBalances = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/wallet/balance`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as BalanceItem[];

        if (isActive) {
          setBalances(data);
          setError(null);
        }
      } catch (caught) {
        if (isActive) {
          const message =
            caught instanceof Error ? caught.message : "Unable to load balance";
          setError(message);
          setBalances(null);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadBalances();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <section className="w-full rounded-2xl border border-black/[.08] px-6 py-5 text-left text-sm text-zinc-700 dark:border-white/[.145] dark:text-zinc-300">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              Balance
            </h2>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {isLoading ? "Loading" : "Updated"}
            </span>
          </div>
          <div className="mt-4">
            {isLoading ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Fetching balances...
              </p>
            ) : error ? (
              <p className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            ) : balances && balances.length > 0 ? (
              <ul className="space-y-3">
                {balances.map((balance) => (
                  <li
                    key={balance.asset}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {balance.asset}
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-300">
                      {balance.available}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No balances available.
              </p>
            )}
          </div>
        </section>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
