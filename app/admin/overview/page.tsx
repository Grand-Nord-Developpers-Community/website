import { getTotalUsers } from "@/actions/user.actions";
import OverViewPage from "./_components/overview";
import { getTotalBlogPosts } from "@/actions/blog.actions";
import { getTotalForumPosts } from "@/actions/forum.actions";

export const metadata = {
  title: "Dashboard : Overview",
};
import { headers } from "next/headers";
import { fetchAppViews, getViewData, ViewData } from "@/actions/utils.actions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query";
import { getTotalUser } from "@/actions/queries/user";
import {
  getTotalBlogs,
  getTotalForums,
  getViewDataStat,
  getViewGlobal,
} from "@/actions/queries/stats";
import PageContainer from "@/components/layout/page-container";

export const dynamic = "force-dynamic";
export default async function page() {
  const qc = getQueryClient();
  console.log("overview page");
  const stats: {
    totalUsers: number;
    totalBlogs: number;
    totalForums: number;
    totalViews: number;
  } = {
    totalUsers: (await qc.fetchQuery(getTotalUser())) ?? 0,
    totalBlogs: (await qc.fetchQuery(getTotalBlogs())) ?? 0,
    totalForums: (await qc.fetchQuery(getTotalForums())) ?? 0,
    totalViews: (await qc.fetchQuery(getViewGlobal())).total ?? 0,
  };
  // let datas = await fetchAppViews();
  let viewDatas: ViewData = [];
  try {
    viewDatas = await qc.fetchQuery(getViewDataStat());
  } catch (e) {
    viewDatas = [];
    console.log(e);
  }

  // const totalUsers = await getTotalUsers();
  // const totalBlogs = await getTotalBlogPosts();
  // const totalForums = await getTotalForumPosts();
  // stats["totalUsers"] = totalUsers;
  // stats["totalBlogs"] = totalBlogs;
  // stats["totalForums"] = totalForums;
  // stats["totalViews"] = datas.total;
  return (
    <PageContainer scrollable>
      <HydrationBoundary state={dehydrate(qc)}>
        view data : {JSON.stringify(viewDatas)}
        <OverViewPage stat={stats} totalViewData={[]} />;
      </HydrationBoundary>
    </PageContainer>
  );
}
