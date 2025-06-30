import { fetcher } from "@/lib/utils";
import useSWR, { preload } from "swr";
import { type User, type Blog, type Forum } from "@/lib/db/schema";
type imageProfile = { image: string };
export type Blogs = { posts: Blog[] };
export type Forums = { forums: Forum[] };
import { BlogType } from "@/interfaces/publication";
export function useUserProfile() {
  preload(`/api/user/profile`, fetcher);
  const { data, error, isLoading } = useSWR(`/api/user/profile`, fetcher, {
    suspense: true,
  });
  return {
    user: data as User,
    isLoading,
    isError: error,
  };
}

export function useGetSiteInsightData() {
  const { data, error, isLoading } = useSWR(`/api/views?type=app`, fetcher);
  return {
    data,
    isLoading,
    isError: error,
  };
}

export function useUserProfileImage() {
  preload(`/api/user/profile/image`, fetcher);
  const { data, error, isLoading } = useSWR(`/api/user/profile/image`, fetcher);
  return {
    user: data as imageProfile,
    isLoading,
    isError: error,
  };
}

export function useGetListBlog() {
  const result = useSWR(`/api/blogs`, fetcher);
  const { data, error, isLoading }=result
  console.log(result)
  return {
    data: data as BlogType,
    isLoading,
    isError: result.data?.error||undefined,
  };
}

export function useUserGetListBlog(userId: string) {
  const { data, error, isLoading } = useSWR(
    `/api/user/${userId}/blog`,
    fetcher
  );
  return {
    postList: data as Blogs,
    isLoading,
    isError: error,
  };
}

export function useUserGetListForum(userId: string) {
  const { data, error, isLoading } = useSWR(
    `/api/user/${userId}/forum`,
    fetcher
  );
  return {
    forumList: data as Forums,
    isLoading,
    isError: error,
  };
}
