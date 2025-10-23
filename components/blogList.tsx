"use client";

import { CardBlog } from "@/components/cardBlog";
import { Button } from "@/components/ui/button";
import EmptyBlog from "@/assets/svgs/undraw_add_notes_re_ln36.svg";
import Link from "next/link";
import { FilterIcon, Loader2 } from "lucide-react";
import { fetchPageViews } from "@/actions/utils.actions";
import { getBlogPostsPaginated } from "@/actions/blog.actions";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChipsTag } from "@/components/ui/chips";

import clsx from "clsx";
import { getInfiniteBlogs } from "@/actions/queries/blogs";
import { useInfiniteQuery } from "@tanstack/react-query";
type Blog = Awaited<ReturnType<typeof getBlogPostsPaginated>>;
interface BlogListProps {
  initialBlogs: Blog;
  initialViews: Record<string, number>;
  tags?: string[];
  pageSize?: number;
}

const BlogList: React.FC<BlogListProps> = ({
  initialBlogs,
  initialViews,
  tags,
  pageSize = 12,
}) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    getInfiniteBlogs(pageSize),
  );
  const [blogs, setBlogs] = useState(initialBlogs);
  const [views, setViews] = useState(initialViews);
  //const [page, setPage] = useState(1);
  //const [loading, setLoading] = useState(false);
  //const [hasMore, setHasMore] = useState(initialBlogs.length === pageSize);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Filter states
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState(blogs);

  // Filter functions
  const tagsIncludeOneOfFilterTag = (tags: string, filters: string[]) => {
    let result = false;
    let splitedTags = tags?.toLocaleLowerCase().split(",");
    filters.forEach((f) => {
      if (splitedTags?.includes(f.toLocaleLowerCase())) result = true;
    });
    return result;
  };

  function filterFn(blog: any) {
    return tagsIncludeOneOfFilterTag(blog.tags as string, filterTags);
  }

  function addFilter(tag: string) {
    if (filterTags.includes(tag)) {
      setFilterTags(filterTags.filter((ft) => ft !== tag));
    } else {
      setFilterTags([...filterTags, tag]);
    }
  }

  function emptyFilters() {
    setFilterTags([]);
  }

  // Update filtered posts when blogs or filterTags change
  useEffect(() => {
    if (filterTags.length > 0) {
      setFilteredPosts(blogs?.filter(filterFn));
    } else {
      setFilteredPosts(blogs);
    }
  }, [filterTags, blogs]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetching]);

  useEffect(() => {
    const blogs = data?.pages.flatMap((page) => page) || [];
    if (blogs.length > 0 && initialBlogs.length < blogs.length) {
      setBlogs(blogs);
    }
  }, [data, initialBlogs]);

  if (blogs.length === 0) {
    return (
      <div className="screen-wrapper my-10">
        <div className="flex flex-col h-[300px] justify-center items-center my-5">
          <EmptyBlog className="mx-auto lg:w-1/3 h-auto max-md:w-1/2" />
          <h2 className="text-xl max-sm:text-base mx-auto text-center font-medium my-3 text-gray-400">
            il y&apos;a pas de blog pour l&apos;instant !
          </h2>
          <div className="flex w-full justify-center my-2">
            <Button className="px-4" asChild variant="secondary">
              <Link href="/blog/new">Publier en un</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-wrapper my-10">
      {/* Filter Tags Section */}
      {tags && tags.length > 0 && (
        <div className="flex no-wrap mb-5">
          <span className="flex items-center px-2" title="Filter">
            <FilterIcon className="size-5 p-[2px]" />
          </span>
          <ChipsTag
            tag={"Tous"}
            className={clsx(
              "sm:self-center px-3 h-[40px] capitalize cursor-pointer text-gray-800 dark:text-gray-500",
              { "!bg-transparent": filterTags.length > 0 },
            )}
            onClick={emptyFilters}
          />
          <div className="flex items-center no-wrap w-max overflow-auto scrollbar scrollbar-hide gap-2 pl-2">
            {tags.map((tag, index) => {
              const onClick = () => {
                addFilter(tag);
              };
              return (
                <ChipsTag
                  onClick={onClick}
                  key={index}
                  tag={tag}
                  className={clsx(
                    "h-[40px] px-3 capitalize border border-border cursor-pointer dark:text-gray-300",
                    {
                      "!bg-transparent !text-gray-800 dark:!text-gray-300":
                        !tagsIncludeOneOfFilterTag(tag, filterTags),
                    },
                  )}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Blog Cards Grid */}
      <div className="w-full gap-4 space-y-4 columns-1 md:columns-2 lg:columns-3 xl:columns-4">
        {filteredPosts.map((blog, i) => (
          <CardBlog
            {...blog}
            view={views[blog.slug]}
            key={`${blog.slug}-${i}`}
          />
        ))}
      </div>

      {/* Empty State for Filtered Results */}
      {filteredPosts.length === 0 && filterTags.length > 0 && (
        <div className="flex flex-col h-[200px] justify-center items-center my-5">
          <h2 className="text-xl max-sm:text-base mx-auto text-center font-medium my-3 text-gray-400">
            Aucun blog trouvé avec les tags sélectionnés
          </h2>
          <Button onClick={emptyFilters} variant="outline">
            Réinitialiser les filtres
          </Button>
        </div>
      )}

      {/* Intersection Observer Target */}
      {filteredPosts.length > 0 && (
        <div ref={observerTarget} className="w-full py-4 flex justify-center">
          {isFetching && (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Chargement...</span>
            </div>
          )}
          {!hasNextPage && blogs.length > 0 && (
            <p className="text-gray-400 text-sm">Vous avez atteint la fin</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogList;
// const BlogList = () => {
//   //const { data: blogs, isLoading, isError } = useGetListBlog();
//   const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
//     useInfiniteQuery(getInfiniteBlogs(10));
//   const { data: tags, isLoading: isTagLoading } = useQuery(getBlogTags());
//   const infiniteRef = React.useRef<HTMLDivElement>(null);
//   const blogs = data?.pages.flatMap((page) => page) || [];
//   React.useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting && hasNextPage && !isFetching) {
//         fetchNextPage();
//       }
//     });
//     if (infiniteRef.current) {
//       observer.observe(infiniteRef.current);
//     }
//     return () => {
//       observer.disconnect();
//     };
//   }, [hasNextPage, isFetching]);
//   //const [blogs, setBlogs] = React.useState<any[]>();
//   const [views, setViews] = React.useState<Record<string, number>>();
//   const [filterTags, setFilterTags] = React.useState<string[]>([]);
//   const [filteredPosts, setFilteredPosts] = React.useState(blogs);

//   React.useEffect(() => {
//     if (filterTags.length > 0) {
//       setFilteredPosts(blogs?.filter(filterFn));
//     } else {
//       setFilteredPosts(blogs);
//     }
//   }, [filterTags, blogs]);

//   /*React.useEffect(() => {
//     const loadViewData = async () => {
//       if (blogs.length === 0) return;
//       const res = await fetchPageViews(
//         blogs.map((p) => p.slug),
//         "blog"
//       );
//       setViews(res);
//     };
//     loadViewData();
//   }, [blogs]);*/

//   function addFilter(tag: string) {
//     if (filterTags.includes(tag)) {
//       setFilterTags(filterTags.filter((ft) => ft != tag));
//     } else {
//       setFilterTags([...filterTags, tag]);
//     }
//   }
//   function emptyFilters() {
//     setFilterTags([]);
//   }

//   const tagsIncludeOneOfFilterTag = (tags: string, filters: string[]) => {
//     let result = false;
//     let splitedTags = tags?.toLocaleLowerCase().split(",");
//     filters.forEach((f) => {
//       if (splitedTags?.includes(f.toLocaleLowerCase())) result = true;
//     });
//     return result;
//   };

//   function filterFn(blog: any) {
//     return tagsIncludeOneOfFilterTag(blog.tags as string, filterTags);
//   }

//   return (
//     <>
//       {isLoading || isTagLoading ? (
//         <div className="my-10 px-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {[...Array(8)].map((_, index) => (
//             <Card key={index}>
//               <CardHeader>
//                 <Skeleton className="h-3 w-1/2" />
//                 <Skeleton className="h-20 w-full" />
//               </CardHeader>
//               <CardContent>
//                 <Skeleton className="h-4 w-3/4" />
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <div className="screen-wrapper my-5">
//           <div className="flex no-wrap mb-5">
//             <span className="flex items-center px-2" title="Filter">
//               <FilterIcon className="size-5 p-[2px]" />
//             </span>
//             <ChipsTag
//               tag={"Tous"}
//               className={clsx(
//                 "sm:self-center px-3 h-[40px] capitalize  cursor-pointer text-gray-800 dark:text-gray-500 ",
//                 { "!bg-transparent": filterTags.length > 0 }
//               )}
//               onClick={emptyFilters}
//             />

//             {tags && (
//               <div className="flex items-center no-wrap w-max overflow-auto scrollbar scrollbar-hide gap-2 pl-2">
//                 {tags.map((tag, index) => {
//                   const onClick = () => {
//                     addFilter(tag);
//                   };
//                   return (
//                     <ChipsTag
//                       onClick={onClick}
//                       key={index}
//                       tag={tag}
//                       // style={
//                       //   tagsIncludeOneOfFilterTag(tag, filterTags)
//                       //     ? {}
//                       //     : {
//                       //         color: "rgb(31 41 55 / .8)",
//                       //         height: "40px",
//                       //         backgroundColor: "transparent",
//                       //       }
//                       // }
//                       className={clsx(
//                         "h-[40px] px-3 capitalize border border-border cursor-pointer dark:text-gray-300",
//                         {
//                           "!bg-transparent !text-gray-800 dark:!text-gray-300":
//                             !tagsIncludeOneOfFilterTag(tag, filterTags),
//                         }
//                       )}
//                     />
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//           {/* w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[minmax(100px,auto)] */}
//           <div className="w-full gap-4 space-y-4 columns-1 md:columns-2 lg:columns-3 xl:columns-4">
//             {filteredPosts?.map((blog, i) => (
//               <CardBlog {...blog} view={views ? views[blog.slug] : 0} key={i} />
//             ))}

//           </div>
//           {isFetching && (
//               <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
//                 {[...Array(3)].map((_, index) => (
//                   <Card key={index} className="w-full">
//                     <CardHeader>
//                       <Skeleton className="h-3 w-1/2" />
//                       <Skeleton className="h-20 w-full" />
//                     </CardHeader>
//                     <CardContent>
//                       <Skeleton className="h-4 w-3/4" />
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           {blogs?.length === 0 && (
//             <div className="flex flex-col h-[300px] justify-center items-center my-5">
//               <EmptyBlog className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
//               <h2 className="text-xl max-sm:text-base mx-auto text-center font-medium my-3 text-gray-400">
//                 il y&apos;a pas de blog pour l&apos;instant !
//               </h2>
//               <div className="flex w-full justify-center my-2">
//                 <Button className="px-4" asChild variant="secondary">
//                   <Link href="/blog/new">Publier en un</Link>
//                 </Button>
//               </div>
//             </div>
//           )}
//           <div ref={infiniteRef}></div>
//         </div>
//       )}
//     </>
//   );
// };

//export default BlogList;
