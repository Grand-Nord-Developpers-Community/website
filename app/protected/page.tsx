import { LogoutButton } from "@/components/auth/LogoutButton";
import { TwoFactorAuthForm } from "@/components/auth/TwoFactorAuthForm";
import { auth } from "@/lib/auth";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { user,session } = await auth();

  if (!user) {
    return null;
  }
  return (
    <div className="flex justify-center items-center gap-4 flex-col h-dvh">
      <h1>Hi, {JSON.stringify(user)}!</h1>
      <h1>Hi, {JSON.stringify(session)}!</h1>

      {/* <TwoFactorAuthForm /> */}
      <LogoutButton />
    </div>
  );
}
