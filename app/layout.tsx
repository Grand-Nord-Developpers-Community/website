import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/sections/common/Footer";
import clsx from "clsx";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";
import BackToTop from "@/components/ui/BackToTop";
export const montserra = localFont({
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
export const metadata: Metadata = {
  metadataBase: new URL("https://gndc.tech"),
  title: "GNDC | Accueil",
  description:
    "Communauté technologique pour la promotion de l'innovation et de la technologie dans le Grand Nord Cameroun",
};
import { SessionProvider } from "@/components/auth/SessionProvider";
import { auth } from "@/lib/auth";
import HeaderWrapper from "@/components/header-wrapper";
import AlertSignIn from "@/components/alertSignIn";
import Scroll from "@/components/scroll";
import { ReportView } from "@/components/ReportView";
import ReportActivity from "@/components/ReportActivity";
import Providers from "@/providers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  // Stabiliser l'ID utilisateur pour éviter les problèmes de hooks
  const userId = session?.user?.id || null;
  
  return (
    <html lang="fr">
      <head>
        <meta name="apple-mobile-web-app-title" content="GNDC" />
      </head>
      <body
        className={clsx("w-full bg-white overflow-x-clip", montserra.className)}
      >
        <Scroll />
        {/* Utiliser une condition pour ne rendre ReportActivity que si userId existe */}
        {userId && <ReportActivity userId={userId} />}
        <ReportView type="app" />
        <HeaderWrapper />
        <main className="w-full min-h-screen overflow-x-clip relative">
          <SessionProvider session={session}>
            <Providers>{children}</Providers>
          </SessionProvider>
        </main>
        <Footer />
        <BackToTop />
        <Toaster />
        <AlertSignIn />
      </body>
    </html>
  );
}
