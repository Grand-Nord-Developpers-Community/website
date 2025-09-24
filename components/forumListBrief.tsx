import { getForumPosts } from "@/actions/forum.actions";
import Link from "next/link";
import { Card } from "./ui/card";
export type Forums = Awaited<ReturnType<typeof getForumPosts>>;
interface Props {
  forumId: string;
  forums: Forums;
}
function forumListBrief({ forumId, forums }: Props) {
  return (
    <Card className="p-4 my-6">
      <h2 className="font-semibold mb-4">Questions posées</h2>
      <div className="space-y-4">
        {forums &&
          forums
            .filter((f) => f.id !== forumId)
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
                  <span className="max-md:truncate max-md:max-w-[115px] max-sm:max-w-[110px]">
                    {f.author.name}
                  </span>
                  · {f.replies.length} Réponse
                </p>
              </div>
            ))}
        {forums && forums.filter((f) => f.id !== forumId).length === 0 && (
          <p>Aucune autre question à été posé</p>
        )}
        {!forums && <p>Erreur chargement forums !!</p>}
      </div>
    </Card>
  );
}
export default forumListBrief;
