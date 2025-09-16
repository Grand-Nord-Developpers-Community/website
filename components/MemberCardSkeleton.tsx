import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MemberCardSkeleton = () => (
  <Card className="bg-white border-0 shadow-md rounded-2xl overflow-hidden">
    <CardHeader className="relative p-0">
      <div className="relative">
        <Skeleton className="w-full h-40" />
      </div>
      <div className="absolute -bottom-10 left-6 z-10">
        <Skeleton className="w-20 h-20 rounded-full" />
      </div>
    </CardHeader>
    <CardContent className="pt-12 pb-6 px-6">
      <div className="mb-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-5 w-1/2" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center">
          <Skeleton className="w-4 h-4 mr-3" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center">
          <Skeleton className="w-4 h-4 mr-3" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center">
          <Skeleton className="w-4 h-4 mr-3" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default MemberCardSkeleton;