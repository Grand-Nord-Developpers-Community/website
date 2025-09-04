import { getTotalUsers } from "@/actions/user.actions";
import OverViewPage from "./_components/overview";
import { getTotalBlogPosts } from "@/actions/blog.actions";
import { getTotalForumPosts } from "@/actions/forum.actions";

export const metadata = {
  title: "Dashboard : Overview",
};
import { headers } from "next/headers";
import { fetchAppViews, getViewData } from "@/actions/utils.actions";

export const dynamic = "force-dynamic";
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
  let datas = await fetchAppViews();
  let viewDatas = await getViewData("app");
  const totalUsers = await getTotalUsers();
  const totalBlogs = await getTotalBlogPosts();
  const totalForums = await getTotalForumPosts();
  stats["totalUsers"] = totalUsers;
  stats["totalBlogs"] = totalBlogs;
  stats["totalForums"] = totalForums;
  stats["totalViews"] = datas.total;
  return <OverViewPage stat={stats} totalViewData={viewDatas} />;
}
