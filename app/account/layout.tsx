import type { Metadata } from "next";
import {auth} from "@/auth"
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "GNDC | Complete",
  description:
    "Completez ces information pour finaliser votre compte",
};
export default async function CompleteRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session=await auth()
  if(!session){
    redirect("/login")
  }else{
    if(session.user?.name){
      redirect("/user/dashboard")
    }
  }

  return (
    <>
       {children}
    </>
  );
}
