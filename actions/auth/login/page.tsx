import LoginForm from "@/components/auth/LoginForm";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="h-full">
      <LoginForm />
    </div>
  );
}
