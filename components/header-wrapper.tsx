import { Header } from "@/sections/common";
import { getUserProfileUserAuth } from "@/actions/user.actions";

export default async function HeaderWrapper() {
  const user = await getUserProfileUserAuth();
  return <Header user={user} />;
}
