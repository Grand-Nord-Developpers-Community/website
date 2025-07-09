// lib/withAuth.ts
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";

type WithAuthOptions = {
  requireProfileCompletion?: boolean;
  ifNoSession?: "redirect" | "notfound";
  ifIncompleteProfile?: "redirect" | "notfound";
};

export async function withAuth(options: WithAuthOptions = {}) {
  const {
    requireProfileCompletion = false,
    ifNoSession = "redirect",
    ifIncompleteProfile = "redirect",
  } = options;

  const { session, user } = await auth();

  if (!session) {
    if (ifNoSession === "notfound") notFound();
    redirect("/login");
  }

  if (requireProfileCompletion && !user?.isCompletedProfile) {
    if (ifIncompleteProfile === "notfound") notFound();
    redirect("/account/complete");
  }

  return { session, user };
}
