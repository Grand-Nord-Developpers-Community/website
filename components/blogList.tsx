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

let tags = [
  "angular", 
  "flutter", 
  "javascript",
  "react",
  "typescript",
  "vue",
  "node.js",
  "python",
  "php",
  "html",
  "css",
  "firebase",
  "mongodb",
  "postgresql",
  "mysql",
  "c++",
  "java",
  "c#",
  "ruby",
  "swift",
  "kotlin",
  "go",
  "rust",
  "sql",
  "git",
  "docker",
  "kubernetes",
  "aws",
  "azure",
  "google cloud",
]

const BlogList = () => {
  //const { data: blogs, isLoading, isError } = useGetListBlog();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [blogs, setBlogs] = React.useState<any[]>();
  const [views, setViews] = React.useState<Record<string, number>>();
  const [filterTags, setFilterTags] = React.useState<string[]>([])
  const [filteredPosts, setFilteredPosts] = React.useState(blogs);

  React.useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await getBlogPosts()
        setBlogs(response)
        const viewsResponse = await fetchPageViews(response?.map((b) => b.slug), "blog")
        setViews(viewsResponse)
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, [])
  
  React.useEffect(() => {
    if (filterTags.length > 0) {
      setFilteredPosts(blogs?.filter(filterFn))
    } else {
      setFilteredPosts(blogs)
    }
  }, [filterTags, blogs])


  function addFilter(tag: string) {
    if (filterTags.includes(tag)) {
      setFilterTags(filterTags.filter(ft => ft != tag))
    } else {
      setFilterTags([...filterTags, tag])
    }
  }
  function emptyFilters() {
    setFilterTags([])
  }

  const tagsIncludeOneOfFilterTag = (tags: string, filters: string[]) => {
    let result = false
    let splitedTags = tags.toLocaleLowerCase().split(',')
    filters.forEach(f => {
      if (splitedTags.includes(f.toLocaleLowerCase())) result = true
    })
    return result;
  }

  function filterFn(blog: any){
    return tagsIncludeOneOfFilterTag(blog.tags as string, filterTags)
  }

  return (
    <>
      {
        loading ? (
          <div>
            <div className="flex items-center w-max gap-2 my-10 ml-6">
              <span className="flex items-center px-2" title="Filter">
                <FilterIcon className="w-[30px] h-[30px] p-[2px]" />
              </span>
              {[...Array(10)].map((_, index) => {
                let width = Math.max(Math.random() * 120, 50)
                return (
                  <Skeleton key={index} style={{width: width + "px"}} className="h-[40px] px-3" />
                )
              })}
            </div>
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
          </div>
        ) : (
          <div className="screen-wrapper my-10">
            <div className="flex no-wrap mb-10">
              <span className="flex items-center px-2" title="Filter">
                <FilterIcon className="w-[30px] h-[30px] p-[2px]" />
              </span>
              <ChipsTag tag={"All"} className="sm:self-center px-3 capitalize cursor-pointer" style={{
                color: "rgb(0 0 0 / .8)",
                height: "40px",
                backgroundColor: filterTags.length > 0 ? "transparent" : "rgb(0 0 0 / .2)"
              }} onClick={emptyFilters}/>
              
              {tags && (
                <div className="flex items-center no-wrap w-max overflow-auto scrollbar scrollbar-hide gap-2 pl-2">
                  {tags.map((tag, index) => {
                    const onClick = () => {
                      addFilter(tag)
                    }
                    return (
                      <ChipsTag onClick={onClick} key={index} tag={tag} style={
                        tagsIncludeOneOfFilterTag(tag, filterTags) ? {} : {
                          color: "rgb(31 41 55 / .8)",
                          height: "40px",
                          backgroundColor: "transparent"
                        }
                      } className="h-[40px] px-3 capitalize border border-gray-200 cursor-pointer"/>
                    )}
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-3 justify-start">
              {filteredPosts?.map((blog, i) => (
                <CardBlog {...blog} view={views ? views[blog.slug] : null} key={i} />
              ))}
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
          </div>
        )
      }
    </>
  );
};

export default BlogList;
