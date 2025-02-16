"use client";

import * as React from "react";
import { Loader2, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetSiteInsightData } from "@/hooks/use-hook";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function PieGraph() {
  const [chartData, setChartData] = React.useState<
    { device: string; visitors: number; fill: string }[]
  >([]);
  const [total, setTotal] = React.useState(0);
  const { data, isLoading, isError } = useGetSiteInsightData();
  React.useEffect(() => {
    if (data) {
      const totalDesktop = data?.reduce(
        (acc: number, curr: { desktop: number }) => acc + curr.desktop,
        0
      );
      const totalMobile = data?.reduce(
        (acc: number, curr: { mobile: number }) => acc + curr.mobile,
        0
      );
      const chart = [
        {
          device: "mobile",
          visitors: totalMobile,
          fill: "var(--color-chrome)",
        },
        {
          device: "desktop",
          visitors: totalDesktop,
          fill: "var(--color-safari)",
        },
      ];
      setChartData(chart);
      setTotal(totalDesktop + totalMobile);
    }
  }, [data]);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Vue pizza visiteurs</CardTitle>
        <CardDescription>3 derniers mois</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <div className="flex justify-center items-center h-56">
            <Loader2 className="animate-spin text-muted-foreground w-10 h-10" />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[360px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="device"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {total}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Visiteurs
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
