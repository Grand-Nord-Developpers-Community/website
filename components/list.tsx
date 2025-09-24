import { getForumPosts, getPaginatedForums } from "@/actions/forum.actions";
import Link from "next/link";
import { Card } from "./ui/card";
import { getBlogPostsPaginated } from "@/actions/blog.actions";
import ImageWrapper from "./imageWrapper";
export type Forums = Awaited<ReturnType<typeof getPaginatedForums>>;
export type Blogs = Awaited<ReturnType<typeof getBlogPostsPaginated>>;
interface Props {
  blogs?: Blogs;
  forums?: Forums;
}
function ListBrief({ blogs, forums }: Props) {
  return (
    <Card className="p-4 my-6">
      <h2 className="font-semibold mb-4">
        {forums ? "Questions posées" : "Articles publiés récemment"}
      </h2>
      <div className="space-y-4">
        {forums &&
          forums.map((f, i) => (
            <div key={i} className="space-y-1">
              <Link
                href={"/forum/" + f.id}
                className="block text-sm hover:text-secondary"
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

        {blogs &&
          blogs.map((f, i) => (
            <div key={i} className="flex gap-2 items-center">
              <div className="w-12 h-full border border-border rounded-lg bg-gray-200">
                <ImageWrapper
                  className={"w-full object-cover h-full object-center "}
                  src={f.preview}
                  hash={f.previewHash}
                  width={1280}
                  height={680}
                  alt={f.title}
                />
              </div>
              <div className="space-y-1">
                <Link
                  href={"/forum/" + f.id}
                  className="block text-sm hover:text-secondary"
                >
                  {f.title}
                </Link>
                <p className="text-xs text-muted-foreground">
                  <span className="max-md:truncate max-md:max-w-[115px] max-sm:max-w-[110px]">
                    {f.author.name}
                  </span>
                  ·{" "}
                  {new Date(f.createdAt).toLocaleDateString("fr-FR", {
                    dateStyle: "medium",
                  })}
                </p>
              </div>
            </div>
          ))}
        {forums && forums.length === 0 && (
          <p>Aucune autre question à été posé</p>
        )}
        {blogs && blogs.length === 0 && <p>pas de blogs !!</p>}
        {!forums && !blogs && <p>Erreur chargement !!</p>}
      </div>
    </Card>
  );
}
export default ListBrief;
