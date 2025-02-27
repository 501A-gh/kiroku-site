"use client";
import { Popover, PopoverTrigger } from "@/components/Popover";
import { auth } from "@/firebase";
import { PopoverContent } from "@radix-ui/react-popover";
import { signOut, User } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Profile({ user }: { user: User }) {
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2">
        <Image
          src={user.photoURL || ""}
          alt="Profile Picture"
          width={32}
          height={32}
          className="rounded-full cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={4}
        className="bg-white border border-zinc-200 p-4 rounded-2xl shadow-md min-w-60 flex flex-col gap-4"
      >
        <div className="flex items-center gap-3">
          <Image
            src={user.photoURL || ""}
            alt="Profile Picture"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <h6>{user.displayName}</h6>
            <div className="text-sm text-zinc-500">{user.email}</div>
          </div>
        </div>
        <button
          onClick={() => {
            signOut(auth);
            router.push("/");
          }}
          className="bg-red-500 text-white rounded-lg px-4 py-2 font-medium hover:bg-red-600 transition duration-200 cursor-pointer"
        >
          Sign Out
        </button>
      </PopoverContent>
    </Popover>
  );
}
