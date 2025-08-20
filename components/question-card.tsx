import Link from "next/link";
import { Eye, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import EmptyQuestionIcon from "@/assets/svgs/undraw_opinion_re_jix4.svg";
import VoidQuestionIcon from "@/assets/svgs/undraw_void_-3-ggu.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelativeTime } from "@/lib/utils";
import { Redis } from "@upstash/redis";
import { getForumPosts } from "@/actions/forum.actions";
import { fetchPageViews } from "@/actions/utils.actions";

const redis = Redis.fromEnv();
export type Forum = Awaited<ReturnType<typeof getForumPosts>>;
export default async function QuestionCard({ filter }: { filter: string }) {
  let questions = await getForumPosts();
  let views: Record<string, number> = {};
  try {
    views = await fetchPageViews(
      questions?.map((b) => b.id),
      "forum"
    );
    // (
    //   await redis.mget<number[]>(
    //     ...questions!.map((q) => ["pageviews", "forums", q?.id!].join(":"))
    //   )
    // ).reduce(
    //   (acc, v, i) => {
    //     acc[questions![i]?.id!] = v ?? 0;
    //     return acc;
    //   },
    //   {} as Record<string, number>
    // );
  } catch (e) {
    console.log(e);
  }
  if (filter === "unanswered") {
    questions = questions.filter((q) => q.replies.length === 0);
  } else if (filter === "answered") {
    questions = questions.filter((q) => q.replies.length > 0);
  }

  return (
    <>
      {questions && questions.length === 0 && (
        <>
          <EmptyQuestionIcon className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
          <h2 className="text-2xl mx-auto text-center font-medium my-3 text-gray-400">
            Pas de questions posées pour l&apos;instant !
          </h2>
        </>
      )}
      {questions &&
        questions.map((q, i) => (
          <Card className="p-4 overflow-hidden" key={i}>
            <div className="flex gap-4">
              <Link href={`/user/${q.author.username}`}>
                <Avatar className="bg-gray-50">
                  <AvatarImage
                    src={
                      q?.author?.image ||
                      `/api/avatar?username=${q?.author.username}`
                    }
                    alt="Author avatar"
                  />
                  <AvatarFallback>
                    {q.author?.name?.slice(0, 2)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>

              <div className="flex-1 space-y-4">
                <Link href={`/forum/${q.id}`} className="block">
                  <h2 className="text-lg font-semibold hover:text-secondary">
                    {q.title}
                  </h2>
                </Link>
                <div className="flex flex-col">
                  <p className="h-full pb-5 min-h-10 w-full line-clamp-5">
                    {q.textContent}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {q.replies.length}{" "}
                      <span className="max-sm:hidden">Réponse</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {Intl.NumberFormat("en-US", {
                        notation: "compact",
                      }).format(views[q.id] ?? 0)}{" "}
                      <span className="max-sm:hidden">
                        Vue{views[q.id] < 1 ? "" : "s"}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {/*Posé par <span className="max-md:truncate max-md:max-w-[115px] max-sm:max-w-[80px]">{q.author?.name}</span>&ensp;&ensp;*/}
                      {formatRelativeTime(new Date(q.createdAt))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      {!questions && (
        <>
          <VoidQuestionIcon className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
          <h2 className="text-2xl mx-auto text-center font-medium my-3 text-gray-400">
            Erreur chargement question
          </h2>
        </>
      )}
    </>
  );
}
