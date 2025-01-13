import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";
//import { Divider } from "@/components/ui/divider";
import Link from "next/link";
export const metadata: Metadata = {
  title: "GNDC | Verify",
  description: "Verifier votre mails",
};
export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const email = searchParams.email;
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <div className="flex flex-col min-h-[40px]  gap-2 pb-2">
          <h1 className="text-xl font-medium">Verify your email</h1>
          <p className="">
            Enter the code we sent to <strong>{email ?? "unknown"}</strong>
          </p>
        </div>
        <VerifyEmailForm />

        <div className="flex items-center gap-4 py-2">
          <hr className="flex-1" />
        </div>
        <div className="flex flex-col  text-sm">
          <p>Didn&apos;t receive the code?</p>
          <p>
            Check your spam folder or <Link href={`#`}>Contact support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
