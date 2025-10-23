"use client";

import { CardBlog } from "@/components/cardBlog";
import { Button } from "@/components/ui/button";
import EmptyBlog from "@/assets/svgs/undraw_add_notes_re_ln36.svg";
import Link from "next/link";
import { FilterIcon } from "lucide-react";
import { fetchPageViews } from "@/actions/utils.actions";
import { getBlogPosts } from "@/actions/blog.actions";
import React, { Suspense } from "react";
import { ChipsTag } from "@/components/ui/chips";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getBlogTags, getInfiniteBlogs } from "@/actions/queries/blogs";
import clsx from "clsx";

const BlogList = () => {
  //const { data: blogs, isLoading, isError } = useGetListBlog();
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery(getInfiniteBlogs(10));
  const { data: tags, isLoading: isTagLoading } = useQuery(getBlogTags());
  const infiniteRef = React.useRef<HTMLDivElement>(null);
  const blogs = data?.pages.flatMap((page) => page) || [];
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    });
    if (infiniteRef.current) {
      observer.observe(infiniteRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetching]);
  //const [blogs, setBlogs] = React.useState<any[]>();
  const [views, setViews] = React.useState<Record<string, number>>();
  const [filterTags, setFilterTags] = React.useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = React.useState(blogs);

  React.useEffect(() => {
    if (filterTags.length > 0) {
      setFilteredPosts(blogs?.filter(filterFn));
    } else {
      setFilteredPosts(blogs);
    }
  }, [filterTags, blogs]);

  React.useEffect(() => {
    const loadViewData = async () => {
      if (blogs.length === 0) return;
      const res = await fetchPageViews(
        blogs.map((p) => p.slug),
        "blog"
      );
      setViews(res);
    };
    loadViewData();
  }, [blogs]);

  function addFilter(tag: string) {
    if (filterTags.includes(tag)) {
      setFilterTags(filterTags.filter((ft) => ft != tag));
    } else {
      setFilterTags([...filterTags, tag]);
    }
  }
  function emptyFilters() {
    setFilterTags([]);
  }

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

  return (
    <>
      {isLoading || isTagLoading ? (
        <div className="my-10 px-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, index) => (
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
      ) : (
        <div className="screen-wrapper my-5">
          <div className="flex no-wrap mb-5">
            <span className="flex items-center px-2" title="Filter">
              <FilterIcon className="size-5 p-[2px]" />
            </span>
            <ChipsTag
              tag={"Tous"}
              className={clsx(
                "sm:self-center px-3 h-[40px] capitalize  cursor-pointer text-gray-800 dark:text-gray-500 ",
                { "!bg-transparent": filterTags.length > 0 }
              )}
              onClick={emptyFilters}
            />

            {tags && (
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
                      // style={
                      //   tagsIncludeOneOfFilterTag(tag, filterTags)
                      //     ? {}
                      //     : {
                      //         color: "rgb(31 41 55 / .8)",
                      //         height: "40px",
                      //         backgroundColor: "transparent",
                      //       }
                      // }
                      className={clsx(
                        "h-[40px] px-3 capitalize border border-border cursor-pointer dark:text-gray-300",
                        {
                          "!bg-transparent !text-gray-800 dark:!text-gray-300":
                            !tagsIncludeOneOfFilterTag(tag, filterTags),
                        }
                      )}
                    />
                  );
                })}
              </div>
            )}
          </div>
          {/* w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[minmax(100px,auto)] */}
          <div className="w-full gap-4 space-y-4 columns-1 md:columns-2 lg:columns-3 xl:columns-4">
            {filteredPosts?.map((blog, i) => (
              <CardBlog {...blog} view={views ? views[blog.slug] : 0} key={i} />
            ))}
            {isFetching && (
              <>
                {[...Array(3)].map((_, index) => (
                  <Card key={index} className="w-full">
                    <CardHeader>
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-20 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>

          {blogs?.length === 0 && (
            <div className="flex flex-col h-[300px] justify-center items-center my-5">
              <EmptyBlog className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
              <h2 className="text-xl max-sm:text-base mx-auto text-center font-medium my-3 text-gray-400">
                il y&apos;a pas de blog pour l&apos;instant !
              </h2>
              <div className="flex w-full justify-center my-2">
                <Button className="px-4" asChild variant="secondary">
                  <Link href="/blog/new">Publier en un</Link>
                </Button>
              </div>
            </div>
          )}
          <div ref={infiniteRef}></div>
        </div>
      )}
    </>
  );
};

export default BlogList;
