import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import ForumDialogButton from "@/components/forum-dialog";
import { cn } from "@/lib/utils";
interface Props {
  className?: string;
}
function forumQuestionCard({ className }: Props) {
  return (
    <Card className={cn("mb-4", className)}>
      <CardHeader>
        <CardTitle className="max-sm:text-lg">
          Aviez vous un problème ?
        </CardTitle>
        <CardDescription>
          si vous aviez un problème ou vous rencontrez des difficulté posez les
          !
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForumDialogButton />
      </CardContent>
    </Card>
  );
}
export default forumQuestionCard;
