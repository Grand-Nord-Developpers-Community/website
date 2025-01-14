import { Header } from "@/sections/common";
import { auth } from "@/lib/auth";

export default async function HeaderWrapper() {
  const {user}= await auth();
  return <Header user={user} />;
}
