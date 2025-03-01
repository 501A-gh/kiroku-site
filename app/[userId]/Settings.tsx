"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import {
  Check,
  Link,
  RefreshCw,
  Settings as SettingsIcon,
} from "react-feather";
import React, { useState } from "react";
import { Switch } from "@/components/ToggleSwitch";
import { Button } from "@/components/Button";

export default function Settings({ userId }: { userId: string }) {
  const [share, setShare] = useState<boolean>(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SettingsIcon className="size-5 hover:rotate-90 duration-700 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Settings</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col border-y border-zinc-200 bg-white gap-8 py-6 px-8 shadow-xs">
          <div className="flex justify-between items-center">
            <div>
              <label className="text-base font-medium" htmlFor="ProgressBar">
                Progress Bar
              </label>
              <p className=" text-zinc-500">
                Days the progress bar starts count down
              </p>
            </div>
            <input
              type="number"
              id="ProgressBar"
              min="3"
              max="30"
              defaultValue={25}
              className="border border-zinc-300 bg-zinc-200 p-1 min-w-10 rounded-md text-center"
            />
          </div>
          <div className="flex justify-between items-end">
            <div>
              <label
                className="text-base font-medium"
                htmlFor="default-expiration-date"
              >
                Default Expiration Date
              </label>
              <p className=" text-zinc-500">
                The default days till expiration is date isn’t inputed
              </p>
            </div>
            <input
              type="number"
              name="default-expiration-date"
              min="1"
              max="30"
              defaultValue={15}
              className="border border-zinc-300 bg-zinc-200 p-1 min-w-10 rounded-md text-center"
            />
          </div>
          <div className="flex justify-between items-end">
            <div>
              <label
                className="text-base font-medium"
                htmlFor="ExpirationSection"
              >
                Expiration Section
              </label>
              <p className=" text-zinc-500">Days till expiration section</p>
            </div>
            <input
              type="number"
              id="ExpirationSection"
              min="1"
              max="10"
              defaultValue={5}
              className="border border-zinc-300 bg-zinc-200 p-1 min-w-10 rounded-md text-center"
            />
          </div>
          <div className="grid gap-4">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-base font-medium" htmlFor="Share">
                  Fridge Sharing
                </label>
                <p className=" text-zinc-500">
                  Allow other user to view your fridge
                </p>
              </div>
              <Switch
                id="Share"
                checked={share}
                onCheckedChange={() => {
                  setShare(!share);
                }}
              />
            </div>
            {share && (
              <div className="w-full border border-zinc-300 bg-zinc-200 flex flex-row items-center rounded-xl py-2 px-3 *:text-zinc-600 gap-2">
                <Link className="w-4 hover:cursor-pointer" />
                <span className="truncate max-w-96">
                  https://kiroku-fridge.vercel.app/{userId}
                </span>
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="sm:justify-start pb-4">
          <div className="flex flex-row items-center justify-center w-full gap-3">
            <Button variant={"transparentDialog"}>
              Reset <RefreshCw />
            </Button>
            <Button variant={"filledDialog"}>
              Save <Check />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
