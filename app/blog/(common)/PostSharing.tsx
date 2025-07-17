"use client";

import { TbBrandFacebook, TbBrandLinkedin, TbBrandX } from "react-icons/tb";

interface PostSharingProps {
  url: string;
  title: string;
}

const PostSharing = ({ url, title }: PostSharingProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
  };

  return (
    <div className="flex justify-center lg:justify-end order-3 lg:order-1">
      <div className="sticky lg:h-[calc(100vh-120px)] top-24 flex lg:flex-col gap-4">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <TbBrandFacebook
            size={40}
            className="p-2 rounded-full border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <TbBrandLinkedin
            size={40}
            className="p-2 rounded-full border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          />
        </a>
        <a
          href={shareLinks.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
        >
          <TbBrandX
            size={40}
            className="p-2 rounded-full border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          />
        </a>
      </div>
    </div>
  );
};

export default PostSharing;
