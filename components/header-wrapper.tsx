import { Header } from "@/sections/common";
import { auth } from "@/lib/auth";

export default async function HeaderWrapper() {
  let { user } = await auth();
  const r = await user?.role;
  const userStr = JSON.stringify(user);

  return <Header user={userStr} role={r} />;
}
