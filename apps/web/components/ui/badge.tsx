import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "neutral" | "success" | "warning" | "danger";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  children: ReactNode;
};

const baseStyles =
  "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium";

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "bg-[var(--color-surface-muted)] text-[var(--color-text-sub)]",
  success: "bg-emerald-500/15 text-emerald-400",
  warning: "bg-amber-500/15 text-amber-400",
  danger: "bg-rose-500/15 text-rose-400",
};

export const Badge = ({
  variant = "neutral",
  children,
  className = "",
  ...props
}: BadgeProps) => (
  <span
    className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    {...props}
  >
    {children}
  </span>
);
