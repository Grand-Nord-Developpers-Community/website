import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
