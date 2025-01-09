import RegisterForm from "@/components/auth/RegisterForm";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="h-full">
      <RegisterForm />
    </div>
  );
}
