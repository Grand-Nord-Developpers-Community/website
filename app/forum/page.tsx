import QuestionLists from "@/components/question-card";
import { UserRanking } from "@/components/user-ranking";
import HeadingPage from "@/sections/common/HeadingPage";
import { MessageCircleQuestionIcon } from "lucide-react";
import ForumQuestionCard from "@/components/forumQuestionCard";
import AdBlock from "@/components/adblock";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ForumTabs } from "./ForumTab";
export const metadata = {
  title: "Forums | Questions et Réponses de la Communauté",
  description:
    "Participez aux forums communautaires. Posez vos questions, obtenez des réponses et partagez vos connaissances.",
};

export default function ForumPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
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
      >
        <ForumQuestionCard className="sm:hidden absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[75%] bg-card max-lg:w-[95%] lg:max-w-screen-lg" />
      </HeadingPage>
      <main className="screen-wrapper pt-36 pb-6 sm:py-6">
        <div className="flex justify-between items-center mb-6 max-sm:hidden">
          <ForumTabs />
          {/* <Button>Poser une question</Button> */}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          <div className="lg:col-span-2 space-y-6">
            {/*<Card className="p-4">
              <ForumPostComponent />
            </Card>*/}
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
              <QuestionLists filter={searchParams.tab ?? "all"} />
            </Suspense>
          </div>
          <div className="relative lg:col-span-1 sm:max-h-[calc(100vh-4rem)] lg:sticky lg:top-20 max-sm:max-h-none  ">
            <div className="absolute z-[10] bottom-0 inset-x-0 h-36 bg-gradient-to-t from-muted to-transparent pointer-events-none data-[expanded=true]:opacity-0 transition-opacity duration-300 ease-in-out" />
            {/* <div className="absolute z-[10] top-0 inset-x-0 h-10 bg-gradient-to-b from-white dark:from-white/50 to-transparent pointer-events-none data-[expanded=true]:opacity-0 transition-opacity duration-300 ease-in-out" /> */}
            <div className="w-full  space-y-5 scrollbar-hide h-full overflow-y-auto">
              <ForumQuestionCard className="max-sm:hidden" />
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
              <AdBlock />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
