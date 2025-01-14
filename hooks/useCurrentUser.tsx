import { SessionContext } from "@/components/auth/SessionProvider";
import { useContext } from "react";

export const useCurrentUser = () => {
  const { user } = useContext(SessionContext);
  return { user };
};
