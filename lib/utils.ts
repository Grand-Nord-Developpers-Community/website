import { ReplyWithAuthor } from "@/actions/forum.actions";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function getTotalReplies(replies: ReplyWithAuthor[]): number {
  return replies.reduce((count, reply) => {
    // Add 1 for the current reply and recursively count the nested replies
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

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const secondsDiff = Math.floor((now.getTime() - date.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });

  if (secondsDiff < 60) {
    return rtf.format(-secondsDiff, "seconds");
  } else if (secondsDiff < 3600) {
    return rtf.format(Math.floor(-secondsDiff / 60), "minutes");
  } else if (secondsDiff < 86400) {
    return rtf.format(Math.floor(-secondsDiff / 3600), "hours");
  } else if (secondsDiff < 2592000) {
    return rtf.format(Math.floor(-secondsDiff / 86400), "days");
  } else if (secondsDiff < 31536000) {
    return rtf.format(Math.floor(-secondsDiff / 2592000), "months");
  } else {
    return rtf.format(Math.floor(-secondsDiff / 31536000), "years");
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
