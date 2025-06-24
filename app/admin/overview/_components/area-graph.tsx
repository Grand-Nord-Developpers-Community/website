"use client";

import * as React from "react";
import { TrendingUp, Loader2 } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetSiteInsightData } from "@/hooks/use-hook";

const chartConfig = {
  desktop: {
    label: "Ordinateur",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

// French month mapping
const monthMapping = {
  "01": "Janv",
  "02": "Févr",
  "03": "Mars",
  "04": "Avr",
  "05": "Mai",
  "06": "Juin",
  "07": "Juil",
  "08": "Août",
  "09": "Sept",
  "10": "Oct",
  "11": "Nov",
  "12": "Déc",
};
import {ViewData} from "../page"
export function AreaGraph({data}:{data:ViewData}) {
  const [chartData, setChartData] = React.useState([]);
  //const { data, isLoading, isError } = useGetSiteInsightData();
  const [isLoading,_]=React.useState(false)
  React.useEffect(() => {
    if (data) {
      const formattedData = (data || [])
        .map((item: { date: string; desktop: number; mobile: number }) => {
          const dateParts = item.date.split("-");
          //@ts-ignore
          const month = monthMapping[dateParts[1]] || "N/A";
          return {
            month,
            desktop: item.desktop,
            mobile: item.mobile,
          };
        })
        .reduce(
          (
            acc: any[],
            {
              month,
              desktop,
              mobile,
            }: { month: string; desktop: number; mobile: number }
          ) => {
            // Check if the month already exists in the accumulator
            let existingMonth = acc.find((item) => item.month === month);

            if (existingMonth) {
              // If it exists, sum the values of desktop and mobile
              existingMonth.desktop += desktop;
              existingMonth.mobile += mobile;
            } else {
              // Otherwise, add a new entry for that month
              acc.push({ month, desktop, mobile });
            }

            return acc;
          },
          []
        );
      //@ts-ignore
      setChartData(formattedData);
    }
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Graphique de visiteurs</CardTitle>
        <CardDescription>
          Affichage du total des visiteurs pour les 3 derniers mois
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-56">
            <Loader2 className="animate-spin text-muted-foreground w-10 h-10" />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[310px] w-full"
          >
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    nameKey="visiteurs"
                    labelFormatter={(value) => value}
                  />
                }
              />
              <Area
                dataKey="mobile"
                type="natural"
                fill={chartConfig.mobile.color}
                fillOpacity={0.4}
                stroke={chartConfig.mobile.color}
                stackId="a"
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill={chartConfig.desktop.color}
                fillOpacity={0.4}
                stroke={chartConfig.desktop.color}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
