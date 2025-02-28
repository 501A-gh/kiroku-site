"use client";
import { db } from "@/firebase";
import { Item } from "@/types";
import { collection } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { motion, AnimatePresence } from "motion/react";
import { ChartContainer } from "@/components/Charts";
import {
  Label,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

const maxDays = 10; // Maximum number of days for the chart

const dateDifference = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Difference in days
};

const getAlertLevel = (daysRemaining: number) => {
  if (daysRemaining <= maxDays * (1 / 3)) return "var(--chart-alert)";
  if (daysRemaining <= maxDays * (2 / 3)) return "var(--chart-warning)";
  return "var(--chart-safe)";
};

export default function Items({ userId }: { userId: string }) {
  const [value, loading, error] = useCollection(
    collection(db, "users", userId, "items")
  );

  const data =
    value?.docs.map((doc) => ({ ...(doc.data() as Item), id: doc.id })) || [];

  return (
    <div className="w-full flex flex-col gap-4">
      <h4>All Items</h4>
      <div className="grid grid-cols-2 gap-4">
        <AnimatePresence>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : (
            data.map(({ id, name, description, expirationDate }, i) => (
              <motion.div
                key={id}
                className="bg-white border border-zinc-200 p-4 rounded-2xl shadow flex items-center gap-4 relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  type: "spring",
                  delay: 0.1 * i,
                }}
              >
                <div className="size-6 border-2 border-zinc-300 bg-white rounded-full absolute top-8 z-10 left-8 opacity-0 transition-all group-hover:opacity-100 cursor-pointer active:scale-95" />
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
                          dateDifference(expirationDate.toDate(), new Date()) <
                          maxDays
                            ? dateDifference(
                                expirationDate.toDate(),
                                new Date()
                              )
                            : maxDays,
                        fill: getAlertLevel(
                          dateDifference(expirationDate.toDate(), new Date())
                        ),
                      },
                    ]}
                    startAngle={90}
                    endAngle={450}
                    innerRadius={23}
                    outerRadius={30}
                  >
                    <RadialBar dataKey="value" background cornerRadius={6} />
                    <PolarAngleAxis
                      tick={false}
                      domain={[0, maxDays]}
                      type="number"
                    />
                    <PolarRadiusAxis
                      tick={false}
                      tickLine={false}
                      axisLine={false}
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
                                  className="fill-foreground text-base font-semibold"
                                >
                                  {dateDifference(
                                    expirationDate.toDate(),
                                    new Date()
                                  )}
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </PolarRadiusAxis>
                  </RadialBarChart>
                </ChartContainer>
                <div className="flex-1">
                  <h5>{name}</h5>
                  <p className="truncate text-zinc-500">{description}</p>
                  {/* <p>
                    Purchased: {doc.datePurchased.toDate().toLocaleDateString()}
                  </p>
                  <p>
                    Expires: {doc.expirationDate.toDate().toLocaleDateString()}
                  </p>
                  <p>Category: {doc.category}</p> */}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
