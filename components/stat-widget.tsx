"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

//import { motion } from "framer-motion";

export interface Stat {
  title: string;
  value: number;
  icon: React.ReactNode;
  unit?: string;
  color: string;
}

interface StatsWidgetProps {
  isLoading?: boolean;
  item: Stat;
}

export default function StatsWidget({ isLoading=false, item }: StatsWidgetProps) {
  return (
    <div
      //initial={{ opacity: 0, y: 20 }}
      //animate={{ opacity: 1, y: 0 }}
      //transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className={`overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1`}
      >
        <CardHeader
          className={`flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r ${item.color}`}
        >
          <CardTitle className="text-lg font-medium text-white">
            {item.title}
          </CardTitle>
          <div className="rounded-full bg-white/20 p-2 text-white">
            {item.icon}
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {isLoading ? (
            <Skeleton className="h-8 w-[100px]" />
          ) : (
            <div
              className="flex items-baseline space-x-2"
              //initial={{ scale: 0.5, opacity: 0 }}
              //animate={{ scale: 1, opacity: 1 }}
              /*transition={{
                type: "spring",
                stiffness: 100,
                //delay: 0.2 + index * 0.1,
              }}*/
            >
              <div className="text-3xl font-extrabold">{item.value}</div>
              {item.unit && (
                <div className="text-sm text-muted-foreground">{item.unit}</div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
