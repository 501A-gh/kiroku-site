"use client";
import { cn } from "@/utils";
import React, { useState } from "react";
import { AnimationItem } from "lottie-web";
import { Player } from "@lottiefiles/react-lottie-player";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import checkAnimation from "@/public/check-animation.json";
import ItemChart from "./ItemChart";

export default function ItemCheck({
  maxDays,
  expirationDate,
  userId,
  id,
}: {
  maxDays: number;
  expirationDate: Timestamp;
  userId: string;
  id: string;
}) {
  const [player, setPlayer] = useState<AnimationItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAnimationComplete = () => {
    if (player) {
      setIsPlaying(false);
      player.stop();
    }
  };

  return (
    <div className="relative w-16 h-16">
      <button
        className={cn(
          "border-2 bg-white rounded-full absolute z-10 transition-all cursor-pointer active:scale-95 flex items-center justify-center",
          isPlaying
            ? "size-12 top-2 left-2 *:scale-110 border-green-500 opacity-100 bg-green-50 text-green-500 text-xl"
            : "border-zinc-300 opacity-0 hover:opacity-100 size-6 top-5 left-5"
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
              handleAnimationComplete();
              await updateDoc(doc(db, "users", userId, "items", id), {
                finished: true,
              });
            }
          }}
        />
      </button>
      <ItemChart maxDays={maxDays} expirationDate={expirationDate} />
    </div>
  );
}
