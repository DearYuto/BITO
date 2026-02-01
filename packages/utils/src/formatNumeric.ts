export type FormatNumericOptions = {
  maximumFractionDigits?: number;
};

export const formatNumeric = (
  value: string | number,
  options: FormatNumericOptions = {},
): string | number => {
  if (typeof value === "number") {
    const maximumFractionDigits = options.maximumFractionDigits ?? 8;

    return value.toLocaleString(undefined, { maximumFractionDigits });
  }

  return value;
};
