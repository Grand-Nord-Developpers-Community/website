import type { Metadata } from "next";
import {auth} from "@/lib/auth"
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "GNDC | User",
  description:
    "Votre espace de publication",
};
export default async function UserRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session=await auth()
  if(!session){
    redirect("/login")
  }else{
    if(!session.user?.name){
      redirect("/account/complete")
    }
  }
  return (
    <>
       {children}
    </>
  );
}
