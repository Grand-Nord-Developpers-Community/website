import type { Metadata } from "next";



import "./globals.css";



export const metadata: Metadata = {
  title: "Grand Nord Developers Community",
  description: "Communauté technologique pour la promotion de l'innovation et de la technologie dans le Grand Nord Cameroun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className="w-full bg-white">
        {children}
      </body>     
    </html>
  );
}
