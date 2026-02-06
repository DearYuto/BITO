type MarketHeaderProps = {
  title: string;
  isLoading: boolean;
};

export const MarketHeader = ({ title, isLoading }: MarketHeaderProps) => (
  <header className="flex flex-col gap-2">
    <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-sub)]">
      Market
    </p>
    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text-main)]">
        {title}
      </h1>
      <span className="text-sm text-[var(--color-text-sub)]">
        {isLoading ? "Loading" : "Live"}
      </span>
    </div>
  </header>
);
