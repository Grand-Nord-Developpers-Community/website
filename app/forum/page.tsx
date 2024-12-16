import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuestionCard } from "@/components/question-card";
import { UserRanking } from "@/components/user-ranking";
import { AskQuestionForm } from "@/components/ask-question-form";
import { Button } from "@/components/ui/button";

const questions = [
  {
    id: "1",
    title: "Publishing my work without advisor",
    author: {
      name: "sarah",
      avatar: "/placeholder.svg",
    },
    stats: {
      answers: 0,
      upvotes: 0,
      downvotes: 0,
      views: 0,
    },
    tags: ["publications", "advisor", "authorship"],
    timeAgo: "30m ago",
  },
  {
    id: "2",
    title: "Choosing your research area",
    author: {
      name: "mike",
      avatar: "/placeholder.svg",
    },
    stats: {
      answers: 5,
      upvotes: 15,
      downvotes: 3,
      views: 727,
    },
    tags: ["phd", "research", "research-topic"],
    timeAgo: "2h ago",
    image: "/placeholder.svg",
  },
];

const topUsers = [
  {
    name: "Simoka",
    avatar: "/placeholder.svg",
    points: 2175,
    joinDate: "2010",
  },
  {
    name: "Felipe del",
    avatar: "/placeholder.svg",
    points: 2083,
    joinDate: "2009",
  },
];

export default function ForumPage() {
  return (
    <div className="h-full w-full bg-gray-50">
      <main className="screen-wrapper py-6">
        <div className="flex justify-between items-center mb-6 max-sm:hidden">
          <Tabs defaultValue="latest">
            <TabsList>
              <TabsTrigger value="latest">Tout</TabsTrigger>
              <TabsTrigger value="unanswered">Pas de reponse</TabsTrigger>
              <TabsTrigger value="trending">Avec reponse</TabsTrigger>
            </TabsList>
          </Tabs>
          {/* <Button>Poser une question</Button> */}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
          <div className="lg:col-span-3 space-y-6">
            <AskQuestionForm />
            {questions.map((question) => (
              <QuestionCard key={question.id} {...question} />
            ))}
          </div>
          <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <div className="text-center text-sm text-muted-foreground mb-4">
                Google Adsense
                <div className="mt-2">300 x 250</div>
              </div>
              <div className="mt-6">
                <UserRanking users={topUsers} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
