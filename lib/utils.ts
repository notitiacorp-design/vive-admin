import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ---------------------------------------------------------------------------
// Core class-name utility
// ---------------------------------------------------------------------------

/**
 * Merges class names with Tailwind conflict resolution.
 *
 * Combines `clsx` (conditional / array / object class handling) with
 * `tailwind-merge` (removes conflicting Tailwind utility classes so the
 * last one wins, e.g. `p-2 p-4` → `p-4`).
 *
 * @example
 * cn('px-2 py-1 bg-red', 'p-3 bg-blue')
 * // => 'p-3 bg-blue'
 *
 * cn('text-sm', isLarge && 'text-lg', { 'font-bold': isBold })
 * // => 'text-lg font-bold' (when isLarge & isBold are true)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ---------------------------------------------------------------------------
// Formatting utilities
// ---------------------------------------------------------------------------

/**
 * Formats a number as a currency string.
 * Defaults to USD with en-US locale.
 */
export function formatCurrency(
  amount: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a number with thousand separators and optional decimal places.
 */
export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions,
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Formats a number as a compact string, e.g. 1200 → '1.2K'.
 */
export function formatCompact(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Formats a percentage value (0–1 range by default).
 * Pass `{ raw: true }` to treat the input as already a percentage (0–100).
 */
export function formatPercent(
  value: number,
  options: { decimals?: number; raw?: boolean } = {}
): string {
  const { decimals = 1, raw = false } = options;
  const pct = raw ? value : value * 100;
  return `${pct.toFixed(decimals)}%`;
}

// ---------------------------------------------------------------------------
// Date / time utilities
// ---------------------------------------------------------------------------

/**
 * Formats a date value to a localised date string.
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  locale = 'en-US'
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

/**
 * Formats a date to a relative time string, e.g. '3 hours ago', 'in 2 days'.
 * Falls back to a formatted date string for differences > 30 days.
 */
export function formatRelativeTime(
  date: Date | string | number,
  locale = 'en-US'
): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diffMs = then - now;
  const diffSeconds = Math.round(diffMs / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (Math.abs(diffSeconds) < 60) return rtf.format(diffSeconds, 'second');
  if (Math.abs(diffMinutes) < 60) return rtf.format(diffMinutes, 'minute');
  if (Math.abs(diffHours) < 24) return rtf.format(diffHours, 'hour');
  if (Math.abs(diffDays) < 30) return rtf.format(diffDays, 'day');

  return formatDate(date, { year: 'numeric', month: 'short', day: 'numeric' }, locale);
}

/**
 * Returns an ISO 8601 date string (YYYY-MM-DD) for a given date.
 */
export function toISODateString(date: Date | string | number = new Date()): string {
  return new Date(date).toISOString().split('T')[0];
}

// ---------------------------------------------------------------------------
// String utilities
// ---------------------------------------------------------------------------

/**
 * Capitalises the first character of a string.
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to Title Case.
 */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * Truncates a string to a maximum length, appending an ellipsis if needed.
 */
export function truncate(str: string, maxLength: number, ellipsis = '…'): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - ellipsis.length) + ellipsis;
}

/**
 * Converts a slug or snake_case string to a human-readable label.
 * e.g. 'user_profile_settings' → 'User Profile Settings'
 */
export function slugToLabel(slug: string): string {
  return toTitleCase(slug.replace(/[-_]/g, ' '));
}

/**
 * Converts a string to a URL-safe slug.
 */
export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generates a random alphanumeric ID string of the given length.
 * Not cryptographically secure – use for UI keys etc.
 */
export function generateId(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ---------------------------------------------------------------------------
// Array / object utilities
// ---------------------------------------------------------------------------

/**
 * Returns a new array with duplicate values removed.
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Groups an array of objects by a key.
 */
export function groupBy<T, K extends keyof T>(
  arr: T[],
  key: K
): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {});
}

/**
 * Sorts an array of objects by a key, ascending or descending.
 */
export function sortBy<T>(
  arr: T[],
  key: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  return [...arr].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * Deeply clones a plain JSON-serialisable object.
 * Use `structuredClone` if available (Node 17+, modern browsers).
 */
export function deepClone<T>(obj: T): T {
  if (typeof structuredClone === 'function') return structuredClone(obj);
  return JSON.parse(JSON.stringify(obj)) as T;
}

// ---------------------------------------------------------------------------
// Async / timing utilities
// ---------------------------------------------------------------------------

/**
 * Returns a promise that resolves after `ms` milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retries an async function up to `maxAttempts` times with exponential back-off.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  baseDelayMs = 200
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        await sleep(baseDelayMs * 2 ** (attempt - 1));
      }
    }
  }

  throw lastError;
}

// ---------------------------------------------------------------------------
// Misc utilities
// ---------------------------------------------------------------------------

/**
 * Type-safe object keys.
 */
export function keys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

/**
 * Type-safe object entries.
 */
export function entries<T extends object>(
  obj: T
): { [K in keyof T]: [K, T[K]] }[keyof T][] {
  return Object.entries(obj) as { [K in keyof T]: [K, T[K]] }[keyof T][];
}

/**
 * Returns `true` if the value is not `null` or `undefined`.
 * Useful as a type guard in `.filter()` calls.
 *
 * @example
 * const ids = [1, null, 2, undefined, 3].filter(isDefined); // [1, 2, 3]
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Clamps a numeric value between `min` and `max`.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Converts bytes to a human-readable file size string.
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}
