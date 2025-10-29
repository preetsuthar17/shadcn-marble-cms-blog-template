import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Locale-aware date formatting (guidelines: locale-aware dates/times) */
export function formatDate(
  input: string | number | Date,
  options?: Intl.DateTimeFormatOptions & { locale?: string }
): string {
  const date = input instanceof Date ? input : new Date(input);
  const { locale, ...fmt } = options ?? {};
  const resolvedLocale =
    locale ?? Intl.DateTimeFormat().resolvedOptions().locale;
  return new Intl.DateTimeFormat(resolvedLocale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    ...fmt,
  }).format(date);
}

/** Locale-aware number formatting (guidelines: tabular numbers via CSS; locale-aware numbers) */
export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions & { locale?: string }
): string {
  const { locale, ...fmt } = options ?? {};
  const resolvedLocale = locale ?? Intl.NumberFormat().resolvedOptions().locale;
  return new Intl.NumberFormat(resolvedLocale, fmt).format(value);
}

/** Locale-aware currency formatting (guidelines: locale-aware currency) */
export function formatCurrency(
  value: number,
  currency: string,
  options?: Intl.NumberFormatOptions & { locale?: string }
): string {
  const { locale, ...fmt } = options ?? {};
  const resolvedLocale = locale ?? Intl.NumberFormat().resolvedOptions().locale;
  return new Intl.NumberFormat(resolvedLocale, {
    style: "currency",
    currency,
    ...fmt,
  }).format(value);
}

/** Join parts with non-breaking spaces (guidelines: use \u00A0 to glue terms) */
export function nonBreakingJoin(...parts: Array<string | number>): string {
  return parts
    .filter((p) => p !== undefined && p !== null && p !== "")
    .join("\u00A0");
}
