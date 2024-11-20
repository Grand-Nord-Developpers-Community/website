import User from "@/interfaces/user";

export default interface Publication {
  featured_image: {
    src: string;
    width: number;
    height: number;
    title?: string;
  } | null;
  tags: string[];
  title: string;
  created_at: Date;
  updated_at: Date;
  summary?: string;

  published_by: Pick<User, "name" | "profile_image" | "role">;
}
