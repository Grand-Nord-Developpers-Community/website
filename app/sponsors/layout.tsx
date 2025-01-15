import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "GNDC | Nos sponsors",
  description:
    "Communauté technologique pour la promotion de l'innovation et de la technologie dans le Grand Nord Cameroun",
};
const FAQLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default FAQLayout;
