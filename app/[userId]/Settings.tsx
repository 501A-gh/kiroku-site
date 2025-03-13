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
  Loader,
  RefreshCw,
  Settings as SettingsIcon,
} from "react-feather";
import React, { useActionState, useEffect } from "react";
import { Switch } from "@/components/ToggleSwitch";
import { Button } from "@/components/Button";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { UserSettings } from "@/types";
import { User } from "firebase/auth";
import toast from "@/components/Toast";

export default function Settings({
  user,
  userId,
}: {
  user: User;
  userId: string;
}) {
  const [value] = useDocument(doc(db, "users", userId));

  const { progressBar, defaultExpir, isPublic } =
    (value?.data() as UserSettings) || {};

  const [state, action, pending] = useActionState(
    async (_: unknown, formData: FormData) => {
      if (user.uid === userId) {
        try {
          await updateDoc(doc(db, "users", userId), {
            progressBar: Number(formData.get("progress-bar")),
            defaultExpir: Number(formData.get("expiration-date")),
            isPublic: formData.get("share") === "on" ? true : false,
          });
          return {
            success: true,
            message: "Settings have been updated.",
          };
        } catch (e) {
          console.error(e);
          return {
            success: false,
            message: "An error occurred.",
          };
        }
      } else {
        return {
          success: false,
          message: "You do not have permission to update settings.",
        };
      }
    },
    undefined
  );

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast({
          title: "Changes Saved",
          description: state?.message,
          state: "success",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: state?.message,
          state: "error",
        });
      }
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SettingsIcon className="size-5 hover:rotate-90 duration-700 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <form action={action}>
          <div className="px-2">
            <div className="w-full space-y-8 border border-zinc-200 bg-white p-7 shadow-xs rounded-2xl">
              <div className="flex justify-between items-end">
                <div>
                  <label
                    className="text-base font-medium"
                    htmlFor="progress-bar"
                  >
                    Progress Bar
                  </label>
                  <p>Days the progress bar starts count down</p>
                </div>
                <input
                  type="number"
                  id="progress-bar"
                  name="progress-bar"
                  min="3"
                  max="30"
                  defaultValue={progressBar}
                  className="border border-zinc-300 bg-zinc-200 p-1 min-w-10 rounded-md text-center"
                />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <label
                    className="text-base font-medium"
                    htmlFor="expiration-date"
                  >
                    Default Expiration Date
                  </label>
                  <p>The default days till expiration is date isn’t inputed</p>
                </div>
                <input
                  type="number"
                  id="expiration-date"
                  name="expiration-date"
                  min="1"
                  max="30"
                  defaultValue={defaultExpir}
                  className="border border-zinc-300 bg-zinc-200 p-1 min-w-10 rounded-md text-center"
                />
              </div>
              <div className="grid gap-4">
                <div className="flex justify-between items-end">
                  <div>
                    <label className="text-base font-medium" htmlFor="share">
                      Fridge Sharing
                    </label>
                    <p>Allow other user to view your fridge</p>
                  </div>
                  <Switch id="share" name="share" defaultChecked={isPublic} />
                </div>
                {isPublic && (
                  <div className="w-full border border-zinc-200 bg-zinc-100 flex flex-row items-center rounded-xl py-2 px-3 *:text-zinc-600 gap-2">
                    <Link className="w-4 hover:cursor-pointer" />
                    <span className="truncate max-w-96">
                      https://kiroku-fridge.vercel.app/{userId}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter className="flex items-center justify-center gap-2">
            <Button type="reset">
              <RefreshCw className="size-4" />
              Reset
            </Button>
            <Button variant="action" type="submit" disabled={pending}>
              {pending ? (
                <Loader className="animate-spin size-4" />
              ) : (
                <Check className="size-4" />
              )}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
