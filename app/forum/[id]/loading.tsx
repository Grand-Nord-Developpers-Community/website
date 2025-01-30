import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="relative h-[230px] bg-[#0B4875] px-4 py-6">
        <div className="screen-wrapper">
          {/* Back button */}
          <div className="w-full mb-8 flex items-center text-white/80">
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Title and user info */}
          <div className="w-full flex flex-col items-center justify-center space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex items-center space-x-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="screen-wrapper my-5">
        <div className="w-full grid gap-8 grid-cols-1 lg:grid-cols-3">
          {/* Posts Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Original post */}
            <div className="rounded-lg border p-4">
              <div className="mb-4 flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Reply */}
            <div className="rounded-lg border p-4">
              <div className="mb-4 flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-lg border p-4">
              <div className="space-y-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-9 w-32" />
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="space-y-4">
                <Skeleton className="h-6 w-40" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
