import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-background dark:border-white/[0.2]  border border-transparent justify-between flex flex-col space-y-4",
        className
      )}>
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200 flex items-start gap-3.5 mt-2">
        <div className="mt-0.5">{icon}</div>
        <div className="">
          <div className="font-semibold  mb-2 ">
            {title}
          </div>
          <div className=" text-sm text-default-500">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
