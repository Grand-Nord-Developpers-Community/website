import MembersGrid from "@/components/MembersGrid";
import MembersHeading from "@/components/MembersHeading";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "GNDC | Nos membres",
  description:
    "Communauté technologique pour la promotion de l'innovation et de la technologie dans le Grand Nord Cameroun",
};
const OurMembers = () => {
  return (
    <section className="w-full">
      <MembersHeading />
      <MembersGrid />
    </section>
  );
};

export default OurMembers;
