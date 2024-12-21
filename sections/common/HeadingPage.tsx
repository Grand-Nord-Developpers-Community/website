import React from "react";
import { cn } from "@/lib/utils";
interface Props {
  title: string;
  titleClassName?: string;
  subtitle?: string;
  subClassName?: string;
  description?: React.ReactNode;
  descClassName?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  withPattern?:boolean;
}
function HeadingPage({
  title,
  titleClassName,
  subtitle,
  subClassName,
  description,
  descClassName,
  children,
  icon,
  withPattern=true
}: Props) {
  return (
    <div className="bg-primary w-full relative">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full  md:px-24 lg:px-8 lg:py-14">
        <div className="sm:mx-auto">
          <div className="flex flex-col sm:text-center sm:mb-0">
            <div className="mb-6 sm:mx-auto">
              {!icon ? (
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary">
                  <svg
                    className="w-10 h-10 text-white"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
              ) : (
                icon
              )}
            </div>
            <div className="md:mx-auto sm:text-center">
              <h1
                className={cn(
                  "max-w-lg mb-6 text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto",
                  titleClassName,
                )}
              >
                <span className="relative inline-block">
                  {withPattern&&<svg
                    viewBox="0 0 52 24"
                    fill="currentColor"
                    className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-deep-purple-accent-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                  >
                    <defs>
                      <pattern
                        id="700c93bf-0068-4e32-aafe-ef5b6a647708"
                        x="0"
                        y="0"
                        width=".135"
                        height=".30"
                      >
                        <circle cx="1" cy="1" r=".7" />
                      </pattern>
                    </defs>
                    <rect
                      fill="url(#700c93bf-0068-4e32-aafe-ef5b6a647708)"
                      width="52"
                      height="24"
                    />
                  </svg>}
                  {title}
                </span>
                {subtitle && (
                  <strong
                    className={cn(
                      "font-extrabold text-secondary sm:block",
                      subClassName,
                    )}
                  >
                    {subtitle}
                  </strong>
                )}
              </h1>
              {description && (
                <p
                  className={cn(
                    "text-base text-indigo-100 md:text-lg mb-10 lg:max-w-5xl",
                    descClassName,
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default HeadingPage;
