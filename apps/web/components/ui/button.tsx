import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "outline";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-300)]";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-700)]",
  ghost: "text-[var(--color-text-main)] hover:bg-[var(--color-surface-muted)]",
  outline:
    "border border-[var(--color-border-soft)] text-[var(--color-text-main)] hover:bg-[var(--color-surface-muted)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
};

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) => (
  <button
    type="button"
    className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    {...props}
  >
    {children}
  </button>
);
