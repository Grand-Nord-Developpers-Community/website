"use client";

import { auth } from "@/lib/auth";
import { PropsWithChildren, createContext, useContext } from "react";

export type ContextTypeAuth = Awaited<ReturnType<typeof auth>>;

export const SessionContext = createContext<ContextTypeAuth>({
  session: null,
  user: null,
});

export const SessionProvider = ({
  children,
  session,
}: PropsWithChildren<{ session: ContextTypeAuth }>) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export function useSession() {
  return useContext(SessionContext);
}
