"use client"
import React from "react"
// import type { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "GNDC | Blog",
//   description:
//     "Edition publication",
// };
import { useParams } from "next/navigation";
const page = () => {
  const { slug } = useParams();
  return (
    <div className="my-16 screen-wrapper max-sm:mt-24" id="explore">
      Edition blog titre : {slug}
    </div>
  );
};

export default page;
