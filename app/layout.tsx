import type { Metadata } from "next";



import "./globals.css";



export const metadata: Metadata = {
  title: "GNDC",
  description: "This is the starting point of the GNDC website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className="w-full bg-gray-900 min-h-screen">
        {children}
      </body>     
    </html>
  );
}
