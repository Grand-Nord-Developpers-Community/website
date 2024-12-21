"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

function RadialProgress({ progress }: { progress: number }) {
  return (
    <div
      x-data="scrollProgress"
      className="  inline-flex items-center justify-center overflow-hidden rounded-full "
    >
      <svg className=" w-20 h-20">
        <circle
          className="text-gray-300"
          strokeWidth={"4"}
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
        <circle
          className="text-black"
          strokeWidth="4"
          strokeDasharray={30 * 2 * Math.PI}
          strokeDashoffset={100 - (progress / 100) * 100}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
      </svg>
      <span className="absolute text-sm text-black" x-text="`${percent}%`">
        {progress}%
      </span>
    </div>
  );
}
export { Progress,RadialProgress }
