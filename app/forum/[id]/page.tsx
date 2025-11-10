import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp, Edit2, Eye } from "lucide-react";
import { notFound } from "next/navigation";
//import { Textarea } from "@/components/ui/textarea";
import HeadingPage from "@/sections/common/HeadingPage";
import { getForumPost, getForumPosts } from "@/actions/forum.actions";
import RenderContent from "@/components/renderContent";
import { formatRelativeTime } from "@/lib/utils";
import { ReportView } from "@/components/ReportView";
import { Redis } from "@upstash/redis";
import CommentSection from "@/components/comment-section";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import UpVoteWrapper from "@/components/upVoteWrapper";
import AdBlock from "@/components/adblock";
import ForumListBrief from "@/components/forumListBrief";
import ForumQuestionCard from "@/components/forumQuestionCard";
import { fetchPageViews } from "@/actions/utils.actions";
import Avatar from "@/components/avatar";
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const {id}=await params
  const post = await getForumPost(id);
  if (!post) return {};

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}/blog/${id}`;
  const description = post.textContent;
  const ogImage = `/api/og/forum/${id}`;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [ogImage],
    },
  };
}
export async function generateStaticParams() {
  const forums = await getForumPosts();
  return forums.map((p) => ({
    id: p.id
  }));
}
export default async function QuestionPage({ params }:{params: Promise<{ id: string }> }) {
  const { id } = await params;
  const forum = await getForumPost(id as string);
  if (!forum) {
    return notFound();
  }
  const forums = await getForumPosts();
  const vote = forum.votes.reduce(
    (total, vote) =>
      total + (vote.commentId === null ? (vote.isUpvote ? 1 : -1) : 0),
    0
  );
  const { user } = await auth();
  let views = 0;

  try {
    const v = await fetchPageViews(forum.id, "forum");
    views = v[forum.id];
  } catch (error) {
    console.error("Failed to fetch views from Redis:", error);
    // fallback to 0, or handle gracefully
  }

  //console.log(forum);
  //console.log(forums);

  return (
    <div className="w-full">
      <ReportView id={id} type="forum" />
      <HeadingPage
        title={forum.title}
        subtitle={""}
        subClassName={"max-sm:block"}
        descClassName={"mb-5"}
        description={
          <div className="flex gap-4 text-left sm:mx-auto w-fit">
            <Avatar className="bg-card size-12" {...forum.author} />
            <div className="flex flex-col gap-1">
              <span>
                <Link href={`/user/${forum?.author.username}`}>
                  {forum.author.name}
                </Link>
              </span>
              <span className="text-xs text-gray-300 font-light">
                Posée le{" "}
                {new Date(forum.createdAt).toLocaleDateString("FR-fr", {
                  dateStyle: "long",
                })}
              </span>
            </div>
          </div>
        }
        withPattern={false}
        icon={
          <>
            <Link
              href="/forum"
              className="inline-flex flex-col items-center sm:items-start text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="inline-flex items-center text-gray-400">
                <ArrowLeft className="mr-2 h-4 w-4" />
                revenir au forum
              </span>
            </Link>
          </>
        }
      />
      <main className="screen-wrapper py-6">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start">
              <div>
                <Avatar
                  className="bg-gray-50 space-x-2 size-10 sm:space-x-0 sm:space-y-2 mr-3 sm:mr-4 mb-2"
                  {...forum.author}
                />
                <UpVoteWrapper
                  id={forum.id}
                  value={vote}
                  user={user}
                  voteList={forum.votes}
                />
              </div>
              <div className="flex-1 space-y-2 ">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center">
                        <span className="font-medium max-md:truncate max-md:max-w-[115px] max-sm:max-w-[110px]">
                          <Link href={`/user/${forum?.author.username}`}>
                            {forum.author.name}
                          </Link>
                        </span>
                        {forum.authorId === user?.id && (
                          <span className="bg-primary text-[10px] text-white px-2 py-0.5 rounded">
                            vous
                          </span>
                        )}
                      </div>
                      <span className="text-gray-400 text-sm">
                        @{forum.author.username}
                      </span>
                    </div>
                  </div>
                </div>
                <RenderContent value={forum.content} />
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(views)}{" "}
                    <span className="max-sm:hidden">Vue</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {/*Posé par {forum.author?.name}&ensp;&ensp;*/}
                    {formatRelativeTime(forum.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <CommentSection postId={id} user={user} />
          </div>
          <div className="relative lg:col-span-1 max-h-[calc(100vh-4rem)] lg:sticky lg:top-20 max-sm:max-h-none  ">
            <div className="absolute z-[10] bottom-0 inset-x-0 h-36 bg-gradient-to-t from-muted to-transparent pointer-events-none data-[expanded=true]:opacity-0 transition-opacity duration-300 ease-in-out" />
            {/* <div className="absolute z-[10] top-0 inset-x-0 h-10 bg-gradient-to-b from-muted to-transparent pointer-events-none data-[expanded=true]:opacity-0 transition-opacity duration-300 ease-in-out" /> */}
            <div className="w-full space-y-8 scrollbar-hide h-full overflow-y-auto">
              <ForumQuestionCard />
              <ForumListBrief forumId={forum.id} forums={forums} />
              {/* Ad Block */}
              <AdBlock />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
