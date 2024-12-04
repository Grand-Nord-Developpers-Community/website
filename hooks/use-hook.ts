import { fetcher } from "@/lib/utils";
import useSWR,{preload} from "swr";
import {type User,type Blog,type Forum} from "@/lib/schema"
type imageProfile={image:string}
export function useUserProfile() {
  preload(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`, fetcher);
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`, fetcher, { suspense: true });
  return {
    user: data as User,
    isLoading,
    isError: error,
  };
}

export function useUserProfileImage() {
  preload(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile/image`, fetcher);
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile/image`, fetcher);
  return {
    user: data as imageProfile,
    isLoading,
    isError: error,
  };
}

export function useUserGetListBlog(){
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/blog`, fetcher);
  return {
    user: data as Blog,
    isLoading,
    isError: error,
  };
}

export function useUserGetListForum(){
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/forum`, fetcher);
  return {
    user: data as Forum,
    isLoading,
    isError: error,
  };
}
