import type { Ticker } from "@/lib/hooks/useMarketData";
import { formatNumeric } from "@repo/utils";
import { SurfaceCard } from "@/components/surface-card";

const formatValue = (value: string | number) =>
  formatNumeric(value, { maximumFractionDigits: 8 });

type TickerSectionProps = {
  ticker: Ticker | null;
  isLoading: boolean;
  error: string | null;
};

export const TickerSection = ({
  ticker,
  isLoading,
  error,
}: TickerSectionProps) => (
  <SurfaceCard className="grid gap-6 p-6">
    <div className="flex items-center justify-between">
      <h2 className="text-base font-semibold text-[var(--color-text-main)]">
        Ticker
      </h2>
      <span className="text-xs text-[var(--color-text-sub)]">
        {isLoading ? "Fetching" : "Updated"}
      </span>
    </div>
    {isLoading ? (
      <p className="text-sm text-[var(--color-text-sub)]">Loading ticker...</p>
    ) : error ? (
      <p className="text-sm text-red-400">{error}</p>
    ) : ticker ? (
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-muted)] px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-[var(--color-text-sub)]">
            Price
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--color-text-main)]">
            {formatValue(ticker.price)}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-muted)] px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-[var(--color-text-sub)]">
            24h Change
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--color-text-main)]">
            {formatValue(ticker.change24h)}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-muted)] px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-[var(--color-text-sub)]">
            24h Volume
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--color-text-main)]">
            {formatValue(ticker.volume24h)}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-muted)] px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-[var(--color-text-sub)]">
            Symbol
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--color-text-main)]">
            {ticker.symbol}
          </p>
        </div>
      </div>
    ) : (
      <p className="text-sm text-[var(--color-text-sub)]">
        No ticker data available.
      </p>
    )}
  </SurfaceCard>
);
