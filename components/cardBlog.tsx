import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageWrapper from "@/components/imageWrapper";
import { BlogType } from "@/interfaces/publication";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
//======================================
export const CardBlog = ({
  title,
  description,
  slug,
  preview,
  previewHash,
  author,
  createdAt,
}: BlogType) => {
  return (
    <div className="w-full md:w-[49%] lg:w-[32.5%] xl:w-[24.2%]">
      <div className="w-full mx-auto rounded-xl dark:bg-zinc-950 bg-zinc-50 overflow-hidden p-2 border pb-3  ">
        <div className="w-full h-[200px] rounded-xl overflow-hidden shadow-[0px_0px_5px_#A1A1AA] dark:shadow-[0px_0px_12px_rgb(39,39,42,0.7)]">
          <ImageWrapper
            className="w-full object-cover h-full object-top "
            src={preview}
            hash={previewHash}
            width={1280}
            height={680}
            //placeholder="blur"
            //blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
            alt={title}
          />
        </div>

        <div className={"text-gray-800 dark:text-gray-200 mb-2 relative"}>
          <div className=" h-16 overflow-hidden overflow-ellipsis">
            <h3 className="text-lg font-bold tracking-tighter mt-3 mb-1 leading-2">
              <Link href={`/blog/${slug}`} className="transition-all hover:text-secondary">{title}</Link>
            </h3>
          </div>
          <div className="h-10 overflow-hidden overflow-ellipsis"><p className="text-sm leading-2">{description}</p></div>
          
        </div>
        <div className="px-0">
          {/*<Button className="w-full rounded-lg" asChild>
            <Link href={`/blog/${slug}`}>Learn more</Link>
          </Button>*/}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={author.image} alt="Author" />
                <AvatarFallback>
                  {author.name.slice(0, 2)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{author.name}</p>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <span>publié le </span>
                  <span>
                    {new Date(createdAt).toLocaleDateString("FR-fr", {
                      dateStyle: "long",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
