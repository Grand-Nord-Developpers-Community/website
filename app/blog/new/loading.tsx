"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
const LoaderBlogPage = () => {
  return (
    <>
      <div className="w-full">
        <div className="screen-wrapper py-5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            </div>
            <Skeleton className="aspect-[4/3] rounded-xl" />
          </div>
        </div>
      </div>

      {/* Skeleton Content */}
      <div className="screen-wrapper py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex gap-6">
              {/* Skeleton Share Buttons */}
              <div className="hidden lg:flex flex-col items-center space-y-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>

              {/* Skeleton Article Content */}
              <div className="space-y-6 flex-grow">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>

            {/* Skeleton Comment Section */}
            <div className="mt-12 space-y-6">
              <Skeleton className="h-8 w-32" />
              <div className="space-y-4">
                {[1, 2].map((item) => (
                  <div key={item} className="flex space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-grow">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skeleton Related Posts */}
            <div className="mt-12 space-y-6">
              <Skeleton className="h-8 w-40" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="space-y-3">
                    <Skeleton className="h-40 w-full rounded-lg" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skeleton Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Skeleton About Me */}
              <div className="border rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-24 mx-auto" />
                <Skeleton className="h-20 w-20 rounded-full mx-auto" />
                <Skeleton className="h-4 w-32 mx-auto" />
                <Skeleton className="h-3 w-48 mx-auto" />
                <div className="flex justify-center space-x-4">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
              </div>

              {/* Skeleton Popular Feeds */}
              <div className="border rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-32" />
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-4">
                    <Skeleton className="h-14 w-14 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Skeleton Ad Block */}
              <div className="border rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-40 w-full rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoaderBlogPage;
