import Image from "next/image";
import ProfileCompletionComponent from "@/components/profileComponent";
import { auth } from "@/lib/auth";
export default async function ProfileCompletion() {
  const session = await auth();
  return <ProfileCompletionComponent userId={session?.user?.id!} />;
}
