"use client";
import React, { use, useState } from "react";
import Profile from "./Profile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import FullScreenLoader from "@/components/FullScreenLoader";
import Link from "next/link";
import {
  Check,
  Lock,
  RefreshCw,
  Settings,
  Link as LinkIcon,
} from "react-feather";
import Input from "./Input";
import Items from "./Items";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { Button } from "@/components/Button";
import { Switch } from "@/components/ToggleSwitch";

export default function Fridge({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const [user, loading, error] = useAuthState(auth);
  const [share, setShare] = useState<boolean>(false);
  if (loading) return <FullScreenLoader />;
  if (error) return <div>Error: {error.message}</div>;

  return !user ? (
    <div className="flex items-center justify-center flex-col gap-6 min-h-screen">
      <Lock />
      <div className="flex items-center flex-col gap-2">
        <h5>You do not have access to this fridge.</h5>
        <Link href="/" className="text-blue-500 underline">
          Go back to home
        </Link>
      </div>
    </div>
  ) : (
    <div className="min-h-screen">
      <header className="flex items-center p-6 w-full bg-white border-b border-zinc-200">
        <div className="flex items-center justify-between max-w-[750px] w-full mx-auto">
          <h3>Kiroku</h3>
          <div className="flex flex-row items-center gap-5">
            <Dialog>
              <DialogTrigger asChild>
                <button>
                  <Settings className="size-5 hover:rotate-90 duration-700 cursor-pointer" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <h6 className="w-full text-center pt-3">Setting</h6>
                <div className="w-full flex flex-col border border-white bg-white gap-5 p-6 *:font-medium">
                  <div className="flex flex-row justify-between items-center">
                    <div>
                      <label className="font-semibold" htmlFor="ProgressBar">
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
                  <div className="flex flex-row justify-between items-center">
                    <div>
                      <label
                        className="font-semibold"
                        htmlFor="DefaultExpiration"
                      >
                        Default Expiration Date
                      </label>
                      <p className=" text-zinc-500">
                        The default days till expiration is date isn’t inputed
                      </p>
                    </div>
                    <input
                      type="number"
                      id="DefaultExpiration"
                      min="1"
                      max="30"
                      defaultValue={15}
                      className="border border-zinc-300 bg-zinc-200 p-1 min-w-10 rounded-md text-center"
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div>
                      <label
                        className="font-semibold"
                        htmlFor="ExpirationSection"
                      >
                        Expiration Section
                      </label>
                      <p className=" text-zinc-500">
                        Days till expiration section
                      </p>
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
                  <div className="grid gap-2">
                    <div className="flex flex-row justify-between items-center">
                      <div>
                        <label className="font-semibold" htmlFor="Share">
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
                      <div className="w-full border border-zinc-300 bg-zinc-200 flex flex-row items-center rounded-md p-2 *:text-zinc-600 gap-2">
                        <button>
                          <LinkIcon className="w-4 hover:cursor-pointer" />
                        </button>
                        <p className="truncate max-w-96">
                          https://kiroku-fridge.vercel.app/{userId}
                        </p>
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
            {userId === user.uid ? <Profile user={user} /> : <h5>Viewing</h5>}
          </div>
        </div>
      </header>
      <main className="p-6">
        <div className="max-w-[750px] w-full mx-auto flex flex-col gap-10">
          <Input user={user} userId={userId} />
          <Items userId={userId} />
        </div>
      </main>
    </div>
  );
}
