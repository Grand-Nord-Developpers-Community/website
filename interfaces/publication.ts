import User from "@/interfaces/user";
import {type Blog} from "@/lib/schema"

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

export interface BlogType extends Blog {
  // Add any custom props you'd like here
  author:{
    email:string,
    name:string,
    image:string
  }
}
