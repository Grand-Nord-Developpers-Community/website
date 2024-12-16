import React from "react";
import HeadingPage from "@/sections/common/HeadingPage";
import { NewspaperIcon } from "lucide-react";
const page = () => {
  return (
    <>
      <HeadingPage
        title="Blogs et publications"
        subtitle={""}
        subClassName={"max-sm:block"}
        descClassName={"mb-5"}
        description={
          "Voici une liste de blog/d'article publié par la communauté"
        }
        icon={
          <div className="p-4 bg-secondary text-white rounded-full flex items-center justify-center w-fit">
            <NewspaperIcon />
          </div>
        }
      />
      <div className="screen-wrapper mt-5"></div>
    </>
  );
};

export default page;
