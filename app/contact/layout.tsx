import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "GNDC | Nous contacter",
  description:
    "Communauté technologique pour la promotion de l'innovation et de la technologie dans le Grand Nord Cameroun",
};
const ContactLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ContactLayout;
