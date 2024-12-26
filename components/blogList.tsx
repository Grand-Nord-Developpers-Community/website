"use client";
import React from "react";
import { CardBlog } from "@/components/cardBlog";
import { useGetListBlog } from "@/hooks/use-hook";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import EmptyBlog from "@/assets/svgs/undraw_add_notes_re_ln36.svg";
import ErrorComponent from "@/components/errorComponent";
import Link from "next/link";
const BlogList = () => {
  const { data: blogs, isLoading, isError } = useGetListBlog();
  return (
    <>
      <div className="screen-wrapper my-10 ">
        {!isLoading && blogs && blogs.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-start">
            {blogs?.map((blog, i) => (
              <CardBlog {...blog} key={i} />
            ))}
          </div>
        )}
        {isLoading && (
          <>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          </>
        )}

        {!isLoading && blogs && blogs?.length === 0 && (
          <>
            <EmptyBlog className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
            <h2 className="text-2xl mx-auto text-center font-medium my-3 text-gray-400">
              Il y&apos;a pas de blog disponible
            </h2>
            <div className="flex w-full justify-center my-2">
              <Button className="px-4" asChild variant="secondary">
                <Link href="/blog/new">Publier en un</Link>
              </Button>
            </div>
          </>
        )}

        {
          !blogs && !isLoading && (
            <>
              <ErrorComponent message={"Erreur de chargement !!"} />
            </>
          )
        }
      </div>
    </>
  );
};

export default BlogList; 
