import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PageContainer({
  children,
  scrollable = true,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="w-full h-[calc(100dvh-64px)]">
          <div className="w-full h-full screen-wrapper p-4 md:px-8 ">
            {children}
          </div>
        </ScrollArea>
      ) : (
        <div className="w-full h-full screen-wrapper  p-4 md:px-8 ">
          {children}
        </div>
      )}
    </>
  );
}
