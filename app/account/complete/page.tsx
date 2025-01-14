import Image from "next/image";
import ProfileCompletionComponent from "@/components/profileComponent";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "GNDC | Complete",
  description: "Completez ces information pour finaliser votre compte",
};
export default async function ProfileCompletion() {
  const { session, user } = await auth();
  if (!session) {
    redirect("/login");
  } else {
    if (user && user.isCompletedProfile) {
      redirect("/user/dashboard");
    }
  }
  return <ProfileCompletionComponent user={user!} />;
}
