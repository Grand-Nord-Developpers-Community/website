import { fetcher } from "@/lib/utils";
import useSWR,{preload} from "swr";
import {type User} from "@/lib/schema"
type imageProfile={image:string}
export function useUserProfile() {
  preload(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`, fetcher);
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile-data`, fetcher, { suspense: true });
  return {
    user: data as User,
    isLoading,
    isError: error,
  };
}

export function useUserProfileImage() {
  preload(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile/image`, fetcher);
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/image`, fetcher);
  return {
    user: data as imageProfile,
    isLoading,
    isError: error,
  };
}
