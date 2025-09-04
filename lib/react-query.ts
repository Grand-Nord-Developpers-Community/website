import { isServer, QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: new client per request
    return makeQueryClient();
  }
  // Browser: reuse one client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
