import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HeadingPage from "@/sections/common/HeadingPage";
import { BookOpen, MessageSquare, Activity, Award } from "lucide-react";
import StatWidget, { Stat } from "@/components/stat-widget";
import { getUserProfileUserAuth } from "@/actions/user.actions";
import { getUserBlogPosts } from "@/actions/blog.actions";
import { getUserForumPosts } from "@/actions/forum.actions";
import { type Blog, type Forum } from "@/lib/schema";
enum widgetType {
  BLOG,
  FORUM,
  ACTIVITY,
  EXPERIENCE,
}
import DashboardPage from "./dashboard-detail";
const Dashboard: React.FC = async () => {
  const user = await getUserProfileUserAuth();
  const posts = await getUserBlogPosts(user?.id!);
  const forums = await getUserForumPosts(user?.id!);
  const statItems: Stat[] = [
    {
      title: "Total Blogs",
      value: posts ? posts.length : 0,
      icon: <BookOpen className="h-6 w-6" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Forums",
      value: forums ? forums.length : 0,
      icon: <MessageSquare className="h-6 w-6" />,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Activitées",
      value: user?.streak || 0,
      icon: <Activity className="h-6 w-6" />,
      unit: "jour",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Total Experiences",
      value: user?.experiencePoints || 0,
      icon: <Award className="h-6 w-6" />,
      unit: "XP",
      color: "from-purple-500 to-purple-600",
    },
  ];
  return (
    <>
      <HeadingPage
        title="Bienvenue à vous ,"
        subtitle={user?.name!}
        subClassName={"max-sm:block"}
        descClassName={"mb-5"}
        description={"Voici une vue d'ensemble de vos dernières activités"}
        icon={
          <Avatar className="h-11 w-11">
            <AvatarImage src={user?.image || ""} alt={user?.name!} />
            <AvatarFallback className="uppercase">
              {user?.name!.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        }
      />
      <div className="screen-wrapper mt-5">
        <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatWidget item={statItems[widgetType.BLOG]} />
          <StatWidget item={statItems[widgetType.FORUM]} />
          <StatWidget item={statItems[widgetType.ACTIVITY]} />
          <StatWidget item={statItems[widgetType.EXPERIENCE]} />
        </div>
        <DashboardPage
          userId={user?.id!}
          forums={forums as Forum[]}
          posts={posts as Blog[]}
          isCompletedProfile={user?.isCompletedProfile!}
        />
      </div>
    </>
  );
};

export default Dashboard;
