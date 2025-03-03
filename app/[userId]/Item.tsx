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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { Button } from "@/components/Button";
import { CheckCircle, Edit, Trash } from "react-feather";

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
    <div>
      <div className="bg-white border border-zinc-200 p-4 rounded-2xl shadow flex items-center gap-4 relative">
        <button
          className={cn(
            "border-2 bg-white rounded-full absolute z-10 transition-all cursor-pointer active:scale-95 flex items-center justify-center",
            isPlaying
              ? "size-12 top-5 left-5 *:scale-110 border-green-500 opacity-100 bg-green-50 text-green-500 text-xl"
              : "border-dashed border-zinc-300 opacity-0 hover:opacity-100 size-6 top-8 left-8"
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
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex-1 cursor-pointer">
              <h5>{name}</h5>
              <p className="truncate text-zinc-500">{description}</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Item</DialogTitle>
            </DialogHeader>
            <div className="px-2">
              <div className="w-full space-y-8 border border-zinc-200 bg-white p-7 shadow-xs rounded-2xl">
                <div className="flex flex-col items-center justify-center gap-2">
                  <h4>{name}</h4>
                  {description && <p>{description}</p>}
                </div>
                <div>
                  <p>
                    <span className="font-semibold pr-1">Expiration Date:</span>
                    {expirationDate.toDate().toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold pr-1">Days Remaining:</span>
                    {dateDifference(expirationDate.toDate(), new Date())}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Button variant="danger">
                  <Trash className="size-4" />
                  Delete
                </Button>
                <Button>
                  <Edit className="size-4" />
                  Edit
                </Button>
              </div>
              <Button variant="action">
                <CheckCircle className="size-4" />
                Used Completely
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
