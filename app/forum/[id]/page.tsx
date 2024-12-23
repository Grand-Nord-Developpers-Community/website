import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import Comment from "@/components/commentComponent";
import RenderContent from "@/components/renderContent";
import { forumPost } from "@/lib/schema";
import { formatRelativeTime } from "@/lib/utils";
import { ArrowBigUp, ArrowBigDown, Eye, MessageSquare } from "lucide-react";
import { getUserProfileUserAuth } from "@/actions/user.actions";
export default async function QuestionPage({ params }: { params: any }) {
  const { id } = params;
  const forum = await getForumPost(id as string);
  const forums = await getForumPosts();
  const user = await getUserProfileUserAuth();
  if (!forum) {
    notFound();
  }
  return (
    <div className="w-full">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-0 border-none shadow-none">
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
                      {/*<div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />0{" "}
                        <span className="max-sm:hidden">Réponse</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />0{" "}
                        <span className="max-sm:hidden">Vue</span>
                      </div>*/}
                      <span className="text-sm text-muted-foreground">
                        Posé par {forum.author?.name}&ensp;&ensp;
                        {formatRelativeTime(new Date(forum.createdAt))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">0 Réponse</h2>
              {/*{Array.from({ length: 2 }).map((_, i) => (
                <Card key={i} className="p-6">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder.svg"
                        alt="Answer author avatar"
                      />
                      <AvatarFallback>AA</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-4">
                      <p className="text-gray-600">
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident.
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <ArrowBigUp className="h-6 w-6 text-green-500 cursor-pointer" />
                          <span className="text-base font-medium">8</span>
                          <ArrowBigDown className="h-6 w-6 text-red-500 cursor-pointer" />
                          <span className="text-base font-medium">2</span>
                        </div>
                        <span>Answered 1h ago by john</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}*/}
            </div>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Votre reponse</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={user.image || ""}
                      alt="Your avatar"
                    />
                    <AvatarFallback>
                      {user.name?.slice(0, 2)?.toUpperCase()}
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
            </Card>
          </div>

          <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <div className="p-4 max-h-[calc(100vh-6rem)] scrollbar-hide overflow-y-auto">
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
                            {f.author.name} · 0 Réponse
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
