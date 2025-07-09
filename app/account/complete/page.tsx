import ProfileCompletionComponent from "@/components/profileComponent";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { withAuth } from "@/lib/withAuth";
export const metadata: Metadata = {
  title: "GNDC | Complete",
  description: "Completez ces information pour finaliser votre compte",
};
export default async function ProfileCompletion() {
  const { user } = await withAuth();
  if (user.isCompletedProfile) {
    redirect("/user/dashboard");
  }
  return <ProfileCompletionComponent user={user} />;
}
