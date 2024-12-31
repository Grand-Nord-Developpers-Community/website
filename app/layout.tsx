import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/sections/common/Footer";
import clsx from "clsx";
import { Toaster } from "@/components/ui/sonner";
import "prismjs/themes/prism.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gndc-website.onrender.com"),
  title: "GNDC | Home",
  description:
    "Communauté technologique pour la promotion de l'innovation et de la technologie dans le Grand Nord Cameroun",
};
import { Toaster } from "@/components/ui/sonner";
import HeaderWrapper from "@/components/header-wrapper";
//import { Montserrat } from "next/font/google";
//const montserrat = Montserrat({ subsets: ["latin"] });

//OFFLINE FONT LOAD
import localFont from "next/font/local";
import BackToTop from "@/components/ui/BackToTop";
const montserra = localFont({
  src: [
    {
      path: "./_fonts/Montserrat-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./_fonts/Montserrat-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./_fonts/Montserrat-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./_fonts/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./_fonts/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./_fonts/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./_fonts/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./_fonts/Montserrat-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
});

import { TooltipProvider } from "@/components/ui/tooltip";
import { ConfirmDialogProvider } from "@/providers/confirm-dialog-provider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /*const session = await auth();
  if (session) {
    updateUserStreak(session.user?.id!);
  }*/
  return (
    <html lang="fr">
      <body
        className={clsx("w-full bg-white overflow-x-clip", montserra.className)}
      >
<<<<<<< HEAD
        <Header />
        <main className="w-full min-h-screen overflow-x-hidden">
          {children}
=======
        <HeaderWrapper />
        <main className="w-full min-h-screen overflow-x-clip">
          <ConfirmDialogProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ConfirmDialogProvider>
>>>>>>> 6df20023aa48dd63e7e2c311d70542d107e348db
        </main>
        <Footer />
        <BackToTop />
        <Toaster />
      </body>
    </html>
  );
}
