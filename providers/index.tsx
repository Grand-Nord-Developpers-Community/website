"use client";

import { NuqsAdapter } from "nuqs/adapters/next";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConfirmDialogProvider } from "./confirm-dialog-provider";
import PushNotification from "@/components/notification/PushNotification";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <ConfirmDialogProvider>
          <TooltipProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </TooltipProvider>
          <PushNotification />
        </ConfirmDialogProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
