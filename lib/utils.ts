import { ReplyWithAuthor } from "@/actions/post_comment.actions";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function getTotalReplies(replies: ReplyWithAuthor[]): number {
  return replies.reduce((count, reply) => {
    return count + 1 + getTotalReplies(reply.replies);
  }, 0);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function getReadableTextRawHTML(htmlString: string) {
  if (typeof window !== "undefined" && typeof DOMParser !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    // Extract readable text
    //@ts-ignore
    const readableText = doc?.body?.textContent.trim();
    return readableText ?? "";
  }
  return "";
}

export function shouldHideHeaderAndFooter(pathname: string) {
  const pathsToHide = ["sign-up", "login", "/blog/new", "/admin", "complete"];

  // Regular expression to match `/blog/[slug]/edit` pattern
  const editPageRegex = /^\/blog\/[^/]+\/edit$/;

  // Check if the current pathname matches any of the specified conditions
  const isHide =
    pathsToHide.some((path) => pathname.includes(path)) ||
    editPageRegex.test(pathname);

  return isHide;
}

export function calculateReadingTime(htmlContent: string): number {
  // Strip HTML tags
  const strippedContent = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");

  // Count the number of words
  const words = strippedContent
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  // Average reading speed in words per minute
  const wordsPerMinute = 200;

  // Calculate reading time in minutes
  const minutes = Math.ceil(words / wordsPerMinute);

  return minutes;
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const secondsDiff = Math.floor((date.getTime() - now.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });
  //console.table({now:now.toISOString(),postdate:date.toISOString()})
  if (Math.abs(secondsDiff) < 60) {
    return rtf.format(secondsDiff, "second");
  } else if (Math.abs(secondsDiff) < 3600) {
    return rtf.format(Math.floor(secondsDiff / 60), "minute");
  } else if (Math.abs(secondsDiff) < 86400) {
    return rtf.format(Math.floor(secondsDiff / 3600), "hour");
  } else if (Math.abs(secondsDiff) < 2592000) {
    return rtf.format(Math.floor(secondsDiff / 86400), "day");
  } else if (Math.abs(secondsDiff) < 31536000) {
    return rtf.format(Math.floor(secondsDiff / 2592000), "month");
  } else {
    return rtf.format(Math.floor(secondsDiff / 31536000), "year");
  }
}

//@ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate"
      ? (accurateSizes[i] ?? "Bytest")
      : (sizes[i] ?? "Bytes")
  }`;
}

type DateInput = Date | string | number;

export function shortDateParts(
  input: DateInput,
  opts?: {
    includeYear?: boolean; // default: true
    locale?: string; // default: 'en-US' (try 'fr-FR' if you prefer)
    timeZone?: string; // e.g. 'Africa/Douala'
  }
): [month: string, day: string] | [month: string, day: string, year: string] {
  const { includeYear = true, locale = "en-US", timeZone } = opts ?? {};

  // Treat YYYY-MM-DD as a date-only (avoid TZ shifts by pinning to UTC midnight)
  const d =
    typeof input === "string" && /^\d{4}-\d{2}-\d{2}$/.test(input)
      ? new Date(input + "T00:00:00Z")
      : new Date(input);

  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }

  const fmt = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "2-digit",
    ...(includeYear ? { year: "numeric" } : {}),
    ...(timeZone ? { timeZone } : {}),
  });

  const parts = fmt.formatToParts(d);
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const year = parts.find((p) => p.type === "year")?.value;

  return includeYear ? [month, day, year ?? ""] : [month, day];
}
