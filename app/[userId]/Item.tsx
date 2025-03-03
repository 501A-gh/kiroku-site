"use client";

import React, { useActionState, useEffect } from "react";
import { ItemData } from "./ItemList";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { Button } from "@/components/Button";
import { Check, Loader, RefreshCw, Trash } from "react-feather";
import ItemCheck from "./ItemCheck";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { categories } from "./Input";
import { DatePicker } from "@/components/DatePicker";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { User } from "firebase/auth";
import toast from "@/components/Toast";

export default function Item({
  maxDays,
  data,
  user,
  userId,
}: {
  maxDays: number;
  data: ItemData;
  user: User;
  userId: string;
}) {
  const { id, name, description, datePurchased, expirationDate, category } =
    data;

  const [state, action, pending] = useActionState(
    async (_: unknown, formData: FormData) => {
      if (user.uid === userId) {
        try {
          await updateDoc(doc(db, "users", userId, "items", id), {
            name: String(formData.get("name")),
            description: String(formData.get("description")),
            datePurchased: new Date(String(formData.get("datePurchased"))),
            expirationDate: new Date(String(formData.get("expirationDate"))),
            category: String(formData.get("category")),
            finished: false,
          });
          return {
            success: true,
            message: "Item has been updated successfully.",
          };
        } catch (e) {
          console.error(e);
          return {
            success: false,
            message: "Failed to update item. Please try again.",
          };
        }
      } else {
        return {
          success: false,
          message: "User ID mismatch.",
        };
      }
    },
    undefined
  );

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast({
          title: "Item Updated",
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
    <div>
      <div className="bg-white border border-zinc-200 p-4 rounded-2xl shadow flex items-center gap-4">
        <ItemCheck
          maxDays={maxDays}
          expirationDate={expirationDate}
          userId={userId}
          id={id}
        />
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex-1 cursor-text">
              <h5>{name}</h5>
              <p className="truncate text-zinc-500 max-w-56 w-full">
                {description}
              </p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{name}</DialogTitle>
            </DialogHeader>
            <form action={action}>
              <div className="px-2">
                <div className="w-full border border-zinc-200 bg-white p-5 shadow-xs rounded-2xl">
                  <div className="flex items-start gap-3">
                    <ItemCheck
                      maxDays={maxDays}
                      expirationDate={expirationDate}
                      userId={userId}
                      id={id}
                    />
                    <div className="flex flex-col flex-1">
                      <input
                        defaultValue={name}
                        name="name"
                        className="text-xl font-medium outline-none focus:bg-zinc-100 p-1 rounded-md"
                        placeholder="Item Name"
                        type="text"
                      />
                      <textarea
                        defaultValue={description}
                        name="description"
                        className="text-base outline-none focus:bg-zinc-100 p-1 rounded-md resize-none"
                        rows={5}
                        placeholder="Item Description"
                      />
                    </div>
                  </div>
                  <div className="pt-3 flex items-center justify-end w-full *:w-fit gap-2">
                    <Select name="category" defaultValue={category} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category}
                            className="capitalize"
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <DatePicker
                      title="Purchase"
                      name="datePurchased"
                      defaultValue={datePurchased.toDate()}
                    />
                    <DatePicker
                      title="Expiration"
                      name="expirationDate"
                      defaultValue={expirationDate.toDate()}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button size="icon" type="button">
                    <Trash className="size-4" />
                  </Button>
                  <Button type="reset">
                    <RefreshCw className="size-4" />
                    Reset
                  </Button>
                </div>
                <Button variant="action" type="submit">
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
      </div>
    </div>
  );
}
