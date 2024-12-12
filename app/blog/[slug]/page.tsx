"use client"
import React from "react"
import { useParams } from "next/navigation";
const page = () => {
  const { slug } = useParams();
  return (
    <div className="my-16 screen-wrapper max-sm:mt-24" id="explore">
      blog titre : {slug}
    </div>
  );
};

export default page;
