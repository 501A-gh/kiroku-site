"use client";
import React, { useState } from "react";
import { ChartContainer } from "@/components/Charts";
import {
  Label,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { ItemData } from "./ItemList";
import { Player } from "@lottiefiles/react-lottie-player";
import checkAnimation from "@/public/check-animation.json";
import { AnimationItem } from "lottie-web";
import { cn } from "@/utils";

const dateDifference = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Difference in days
};

const getAlertLevel = (daysRemaining: number, maxDays: number) => {
  if (daysRemaining <= maxDays * (1 / 3)) return "var(--chart-alert)";
  if (daysRemaining <= maxDays * (2 / 3)) return "var(--chart-warning)";
  return "var(--chart-safe)";
};

export default function Item({
  maxDays,
  data,
  userId,
}: {
  maxDays: number;
  data: ItemData;
  userId: string;
}) {
  const { id, name, description, expirationDate } = data;
  const [player, setPlayer] = useState<AnimationItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAnimationComplete = () => {
    if (player) {
      setIsPlaying(false);
      player.stop();
    }
  };

  return (
    <div
      key={id}
      className="bg-white border border-zinc-200 p-4 rounded-2xl shadow flex items-center gap-4 relative group"
    >
      <button
        className={cn(
          "border-2 bg-white rounded-full absolute  z-10  transition-all cursor-pointer active:scale-95 flex items-center justify-center",
          isPlaying
            ? "size-12 top-5 left-5 *:scale-110 border-green-500 opacity-100 bg-green-50 text-green-500 text-xl"
            : "border-dashed border-zinc-300 opacity-0 group-hover:opacity-100 size-6 top-8 left-8"
        )}
        onClick={() => {
          if (player) {
            setIsPlaying(true);
            player.play();
          }
        }}
        onMouseLeave={() => !isPlaying && handleAnimationComplete()}
        id="lottie"
      >
        <Player
          lottieRef={(intance) => setPlayer(intance)}
          autoplay={false}
          loop={false}
          src={checkAnimation}
          style={{
            width: "1em",
            height: "1em",
          }}
          onEvent={async (event) => {
            if (event === "complete") {
              // Set the item as finished
              handleAnimationComplete();
              await updateDoc(doc(db, "users", userId, "items", id), {
                finished: true,
              });
            }
          }}
        />
      </button>
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
    </div>
  );
}
