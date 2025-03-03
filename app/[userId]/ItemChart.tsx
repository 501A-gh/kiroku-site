import { ChartContainer } from "@/components/Charts";
import { Timestamp } from "firebase/firestore";
import React from "react";
import {
  Label,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

const dateDifference = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Difference in days
};

const getAlertLevel = (daysRemaining: number, maxDays: number) => {
  if (daysRemaining <= maxDays * (1 / 3)) return "var(--chart-alert)";
  if (daysRemaining <= maxDays * (2 / 3)) return "var(--chart-warning)";
  return "var(--chart-safe)";
};

export default function ItemChart({
  expirationDate,
  maxDays,
}: {
  expirationDate: Timestamp;
  maxDays: number;
}) {
  return (
    <ChartContainer
      config={{
        daysTillExpiration: {
          label: "Days till expiration",
        },
      }}
      className="aspect-square min-w-14"
    >
      <RadialBarChart
        data={[
          {
            value:
              dateDifference(expirationDate.toDate(), new Date()) < maxDays
                ? dateDifference(expirationDate.toDate(), new Date())
                : maxDays,
            fill: getAlertLevel(
              dateDifference(expirationDate.toDate(), new Date()),
              maxDays
            ),
          },
        ]}
        startAngle={90}
        endAngle={450}
        innerRadius={21}
        outerRadius={30}
      >
        <RadialBar dataKey="value" background cornerRadius={6} />
        <PolarAngleAxis tick={false} domain={[0, maxDays]} type="number" />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                      className="fill-foreground text-base font-semibold"
                    >
                      {dateDifference(expirationDate.toDate(), new Date())}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
