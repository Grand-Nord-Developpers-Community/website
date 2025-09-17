import PageContainer from "@/components/layout/page-container";
import React from "react";

function Activity() {
  return (
    <PageContainer scrollable>
      <div className="w-full h-[calc(100dvh-100px)] flex items-center justify-center">
        <p className="text-lg sm:text-xl font-medium">Page en maintenance !!</p>
      </div>
    </PageContainer>
  );
}

export default Activity;
