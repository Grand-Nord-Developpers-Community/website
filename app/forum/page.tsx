import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionLists from "@/components/question-card";
import { UserRanking } from "@/components/user-ranking";
import ForumPostComponent from "@/components/forum-post-component";
import HeadingPage from "@/sections/common/HeadingPage";
import { MessageCircleQuestionIcon } from "lucide-react";
import ForumDialogButton from "@/components/forum-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
export default function ForumPage() {
  return (
    <div className="h-full w-full">
      <HeadingPage
        title="Forums pour vos questions"
        subtitle={""}
        subClassName={"max-sm:block"}
        descClassName={"mb-5"}
        description={"Voici une liste de question posé par la communauté"}
        icon={
          <div className="p-4 bg-secondary text-white rounded-full flex items-center justify-center w-fit">
            <MessageCircleQuestionIcon />
          </div>
        }
      />
      <main className="screen-wrapper py-6">
        <div className="flex justify-between items-center mb-6 max-sm:hidden">
          <Tabs defaultValue="latest">
            <TabsList>
              <TabsTrigger value="latest" disabled={true}>
                Tout
              </TabsTrigger>
              <TabsTrigger value="unanswered" disabled={true}>
                Pas de reponse
              </TabsTrigger>
              <TabsTrigger value="trending" disabled={true}>
                Avec reponse
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {/* <Button>Poser une question</Button> */}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-4">
              <ForumPostComponent />
            </Card>
            <Suspense
              fallback={
                <div className="space-y-3">
                  {[...Array(4)].map((_, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-20 w-full" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-3/4" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              }
            >
              <QuestionLists />
            </Suspense>
          </div>
          <div className="relative lg:col-span-1 max-h-[calc(100vh-4rem)] lg:sticky lg:top-10 max-sm:max-h-none  ">
            <div className="absolute z-[10] bottom-0 inset-x-0 h-36 bg-gradient-to-t from-white dark:from-white/50 to-transparent pointer-events-none data-[expanded=true]:opacity-0 transition-opacity duration-300 ease-in-out" />
            <div className="absolute z-[10] top-0 inset-x-0 h-10 bg-gradient-to-b from-white dark:from-white/50 to-transparent pointer-events-none data-[expanded=true]:opacity-0 transition-opacity duration-300 ease-in-out" />
            <div className="w-full space-y-8 scrollbar-hide h-full overflow-y-auto">
              <Card>
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
              <Suspense
                fallback={
                  <Card className="my-1">
                    <CardHeader>
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-20 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
                }
              >
                <UserRanking />
              </Suspense>
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
