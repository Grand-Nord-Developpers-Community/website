// Types
export interface Category {
    name: string;
    subcategories?: string[];
    color?: string;
}

export interface ForumTopic {
    id: number;
    title: string;
    author: string;
    authorUsername: string;
    categories: string[];
    replies: number;
    views: number;
    lastActive: string;
    content: string;
    status: "Résolu" | "Non résolu";
}
