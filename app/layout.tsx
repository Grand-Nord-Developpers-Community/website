import type { Metadata } from "next";

import "./globals.css";
import { Header } from "@/sections/common";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Grand Nord Developers Community",
  description:
    "Communauté technologique pour la promotion de l'innovation et de la technologie dans le Grand Nord Cameroun",
};

//import { Montserrat } from "next/font/google";
//const montserrat = Montserrat({ subsets: ["latin"] });

//OFFLINE FONT LOAD
import localFont from "next/font/local";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx("w-full bg-white", montserra.className)}>
        <Header />
        {children}
      </body>
    </html>
  );
}
