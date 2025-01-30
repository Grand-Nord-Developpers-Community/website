import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp, Edit2, Eye } from "lucide-react";
import { notFound } from "next/navigation";
import ForumDialogButton from "@/components/forum-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
//import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
export const revalidate = 60;

const redis = Redis.fromEnv();
export default async function QuestionPage({ params }: { params: any }) {
  const { id } = params;
  const forum = await getForumPost(id as string);
  if (!forum) {
    notFound();
  }
  const forums = await getForumPosts();
  const vote = forum.votes.reduce(
    (total, vote) =>
      total + (vote.commentId === null ? (vote.isUpvote ? 1 : -1) : 0),
    0
  );
  const { user } = await auth();
  const views =
    (await redis.get<number>(["pageviews", "forums", id].join(":"))) ?? 0;

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
            <Avatar className="size-12">
              <AvatarImage src={forum.author.image || ""} />
              <AvatarFallback className="p-0 font-medium">
                {forum.author?.name?.slice(0, 2)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <span>{forum.author.name}</span>
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
              //className="inline-flex flex-col items-center sm:items-start text-sm text-muted-foreground hover:text-primary transition-colors"
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
                <Avatar className="space-x-2 sm:space-x-0 sm:space-y-2 mr-3 sm:mr-4 mb-2">
                  <AvatarImage
                    src={forum.author?.image || ""}
                    alt={forum.author?.name || "Avatar"}
                  />
                  <AvatarFallback>
                    {forum.author?.name?.slice(0, 2)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
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
                        <span className="font-medium">{forum.author.name}</span>
                        {forum.authorId === user?.id && (
                          <span className="bg-primary text-[10px] text-white px-2 py-0.5 rounded">
                            you
                          </span>
                        )}
                      </div>
                      <span className="text-gray-400 text-sm">
                        @{forum.author.username}
                      </span>
                    </div>
                    {/* <div className="flex items-center gap-2 sm:gap-4">
                      {forum.authorId === user?.id && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary/80 hover:bg-primary/10 px-2 sm:px-3"
                            //onClick={() => setIsEditing(true)}
                          >
                            <Edit2 className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Edit</span>
                          </Button>
                        </>
                      )}
                    </div> */}
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
                    Posé par {forum.author?.name}&ensp;&ensp;
                    {formatRelativeTime(new Date(forum.createdAt))}
                  </span>
                </div>
              </div>
            </div>

            {/* <Card className="p-0 border-none shadow-none">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage
                    src={forum.author.image || ""}
                    alt="Author avatar"
                  />
                  <AvatarFallback>
                    {forum.author?.name?.slice(0, 2)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col">
                    <RenderContent content={forum.content} />
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {Intl.NumberFormat("en-US", {
                          notation: "compact",
                        }).format(views)}{" "}
                        <span className="max-sm:hidden">Vue</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Posé par {forum.author?.name}&ensp;&ensp;
                        {formatRelativeTime(new Date(forum.createdAt))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card> */}

            {/* <ForumPostComponent
              postId={id}
              parentId={"e43f9dd7-f75f-42cf-b24e-7debd7c992ac"}
            /> */}
            <CommentSection
              postId={id}
              user={user}
              //@ts-ignore
              commentLists={forum?.replies}
            />
            {/* <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Votre reponse</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={user?.image || ""}
                      alt={user?.name || "Avatar"}
                    />
                    <AvatarFallback>
                      {user?.name?.slice(0, 2)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user?.name}</span>
                </div>
                <Comment
                  throttleDelay={1000}
                  className={"h-[200px] min-h-56 w-full rounded-xl"}
                  editorContentClassName="overflow-auto h-full"
                  output="html"
                  placeholder="Comment here..."
                  editable={true}
                  editorClassName="focus:outline-none px-5 py-4 h-full"
                />
                <Button disabled={true}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Repondre
                </Button>
              </div>
            </Card> */}
          </div>
          <div className="relative lg:col-span-1 max-h-[calc(100vh-4rem)] lg:sticky lg:top-15 max-sm:max-h-none  ">
            <div className="absolute z-[10] bottom-0 inset-x-0 h-36 bg-gradient-to-t from-white dark:from-white/50 to-transparent pointer-events-none data-[expanded=true]:opacity-0 transition-opacity duration-300 ease-in-out" />
            <div className="absolute z-[10] top-0 inset-x-0 h-10 bg-gradient-to-b from-white dark:from-white/50 to-transparent pointer-events-none data-[expanded=true]:opacity-0 transition-opacity duration-300 ease-in-out" />
            <div className="pt-5 w-full space-y-8 scrollbar-hide h-full overflow-y-auto">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Aviez vous un problème ?</CardTitle>
                  <CardDescription>
                    si vous aviez un problème ou vous rencontrez des difficulté
                    posez les !
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ForumDialogButton />
                </CardContent>
              </Card>
              <Card className="p-4 my-6">
                <h2 className="font-semibold mb-4">Questions posées</h2>
                <div className="space-y-4">
                  {forums &&
                    forums
                      .filter((f) => f.id !== forum.id)
                      .slice(0, 3)
                      .map((f, i) => (
                        <div key={i} className="space-y-1">
                          <Link
                            href={"/forum/" + f.id}
                            className="block text-sm hover:text-blue-600"
                          >
                            {f.title}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            {f.author.name} · {f.replies.length} Réponse
                          </p>
                        </div>
                      ))}
                  {forums &&
                    forums.filter((f) => f.id !== forum.id).length === 0 && (
                      <p>Aucune autre question à été posé</p>
                    )}
                  {!forums && <p>Erreur chargement forums !!</p>}
                </div>
              </Card>
              {/* Ad Block */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Publicité</h3>
                <div className="bg-gray-100 h-40 flex items-center justify-center rounded">
                  <p className="text-gray-500">Espace publicitère</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
