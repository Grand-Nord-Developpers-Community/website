import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Mountain Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-4xl bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              {/* Profile Image */}
              <div className="relative">
                <Skeleton className="w-24 h-24 rounded-full animate-pulse" />
                {/* Pulsing ring animation */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-20"></div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-3">
                <Skeleton className="h-8 w-64 animate-pulse" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-full animate-pulse" />
                  <Skeleton className="h-6 w-12 rounded-full animate-pulse" />
                </div>
                <Skeleton className="h-4 w-32 animate-pulse" />
              </div>

              {/* Stats */}
              <div className="flex gap-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="text-center">
                    <Skeleton className="h-8 w-12 mx-auto mb-1 animate-pulse" />
                    <Skeleton className="h-4 w-16 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <div className="flex space-x-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="pb-4">
                    <Skeleton className="h-6 w-16 animate-pulse" />
                    {item === 1 && (
                      <div className="mt-2 h-0.5 bg-green-500 animate-pulse"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* About Me Section */}
              <div>
                <Skeleton className="h-8 w-32 mb-6 animate-pulse" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full animate-pulse" />
                  <Skeleton className="h-4 w-full animate-pulse" />
                  <Skeleton className="h-4 w-3/4 animate-pulse" />
                  <Skeleton className="h-4 w-full animate-pulse" />
                  <Skeleton className="h-4 w-5/6 animate-pulse" />
                  <Skeleton className="h-6 w-20 mt-4 animate-pulse" />
                </div>
              </div>

              {/* Contact Details Section */}
              <div>
                <Skeleton className="h-8 w-40 mb-6 animate-pulse" />

                {/* Email */}
                <div className="mb-6">
                  <Skeleton className="h-3 w-24 mb-2 animate-pulse" />
                  <Skeleton className="h-5 w-48 animate-pulse" />
                </div>

                {/* Social Media */}
                <div className="mb-8">
                  <Skeleton className="h-3 w-20 mb-3 animate-pulse" />
                  <div className="flex space-x-3">
                    {[1, 2, 3, 4].map((item) => (
                      <Skeleton
                        key={item}
                        className="w-8 h-8 rounded-full animate-pulse"
                      />
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <Skeleton className="h-3 w-12 mb-3 animate-pulse" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                      <Skeleton
                        key={item}
                        className={`h-7 animate-pulse ${
                          item === 1
                            ? "w-24"
                            : item === 2
                              ? "w-28"
                              : item === 3
                                ? "w-32"
                                : item === 4
                                  ? "w-20"
                                  : item === 5
                                    ? "w-36"
                                    : item === 6
                                      ? "w-24"
                                      : "w-20"
                        } rounded-full`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loading Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <span className="text-sm text-gray-600 ml-2">Loading profile...</span>
        </div>
      </div>
    </div>
  );
}
