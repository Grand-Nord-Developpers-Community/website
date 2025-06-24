import { getTotalUsers } from "@/actions/user.actions";
import OverViewPage from "./_components/overview";
import { getTotalBlogPosts } from "@/actions/blog.actions";
import { getTotalForumPosts } from "@/actions/forum.actions";

export const metadata = {
  title: "Dashboard : Overview",
};
import { headers } from "next/headers";

const getBaseUrl = () => {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${protocol}://${host}`;
};
export const dynamic = "force-dynamic";
export type ViewData = {
  date: string;
  desktop: number;
  mobile: number;
}[];
export default async function page() {
  console.log("overview page");
  const stats: {
    totalUsers: number;
    totalBlogs: number;
    totalForums: number;
    totalViews: number;
  } = {
    totalUsers: 0,
    totalBlogs: 0,
    totalForums: 0,
    totalViews: 0,
  };
  let totalViews = 0;
  let datas: ViewData = [];
  const baseUrl = getBaseUrl();
  await fetch(`${baseUrl}/api/views?type=app`, { cache: "no-store" })
    .then((res) => res.json())
    .then((data) => {
      datas = data;
      const totalDesktop = data?.reduce(
        (acc: number, curr: { desktop: number }) => acc + curr.desktop,
        0
      );
      const totalMobile = data?.reduce(
        (acc: number, curr: { mobile: number }) => acc + curr.mobile,
        0
      );
      totalViews = totalDesktop + totalMobile;
    })
    .catch((e) => console.log(e));
  const totalUsers = await getTotalUsers();
  const totalBlogs = await getTotalBlogPosts();
  const totalForums = await getTotalForumPosts();
  stats["totalUsers"] = totalUsers;
  stats["totalBlogs"] = totalBlogs;
  stats["totalForums"] = totalForums;
  stats["totalViews"] = totalViews;
  return <OverViewPage stat={stats} totalViewData={datas} />;
}
