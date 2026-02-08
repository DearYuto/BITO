import type { HTMLAttributes, ReactNode } from "react";

type TagProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

export const Tag = ({ children, className = "", ...props }: TagProps) => (
  <span
    className={`inline-flex items-center rounded-full border border-[var(--color-border-soft)] px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-sub)] ${className}`}
    {...props}
  >
    {children}
  </span>
);
