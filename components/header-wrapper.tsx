import { Header } from "@/sections/common";
import { auth } from "@/lib/auth";

export default async function HeaderWrapper() {
  let { user } = await auth();
  const r = await user?.role;

  return <Header user={user} role={r} />;
}
