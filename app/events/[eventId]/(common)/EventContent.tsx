"use client";

import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import ActivityAndEvent from "@/interfaces/activityAndEvent";

function EventContent({
  event,
  views = 0,
}: {
  event: ActivityAndEvent;
  views?: number;
}) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 screen-wrapper lg:grid-cols-[minmax(auto,1fr)_minmax(auto,320px)] gap-6 lg:gap-12 py-12"
      )}
    >
      <div className="order-2 min-w-full">
        <article className="min-w-full prose prose-blue dark:prose-invert prose-headings:scroll-m-20 article-content">
          <p>{event.description}</p>
        </article>

        <Separator className="my-6 bg-primary/30" />

        {/* <CommentSection user={user} blogId={event.id} />  */}
      </div>

      {/* <div className="order-1 lg:order-3 max-lg:hidden">
        <ProfilCard {...event.creator} />
      </div> */}
    </div>
  );
}

export default EventContent;
