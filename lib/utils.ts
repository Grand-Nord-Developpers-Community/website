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
  const secondsDiff = Math.floor((now.getTime() - date.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });
  console.table({now:now.toISOString(),postdate:date.toISOString()})
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
