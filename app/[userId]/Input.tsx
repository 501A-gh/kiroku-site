"use client";
import { Button } from "@/components/Button";
import { DatePicker } from "@/components/DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import toast from "@/components/Toast";
import { db } from "@/firebase";
import { Item } from "@/types";
import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useActionState, useEffect } from "react";
import { Loader, Plus } from "react-feather";

export const categories: string[] = [
  "fruits",
  "vegetables",
  "dairy",
  "meat",
  "seafood",
  "eggs",
  "beverages",
  "condiments",
  "snacks",
  "frozen",
  "bakery",
  "leftovers",
  "other",
];

export default function Input({
  user,
  userId,
}: {
  user: User;
  userId: string;
}) {
  const [state, action, pending] = useActionState(
    async (_: unknown, formData: FormData) => {
      if (user.uid === userId) {
        const userInput: Item = {
          name: String(formData.get("name")),
          description: String(formData.get("description")),
          datePurchased: new Date(String(formData.get("datePurchased"))),
          expirationDate: new Date(String(formData.get("expirationDate"))),
          category: String(formData.get("category")),
          finished: false,
        };
        try {
          await addDoc(collection(db, "users", user.uid, "items"), userInput);
          return {
            success: true,
            message: "Item has been added successfully.",
          };
        } catch (e) {
          console.error(e);
          return {
            success: false,
            message: "Failed to add item. Please try again.",
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
          title: "Item Added",
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
    <form
      className="flex flex-col gap-4 p-1.5 bg-white border border-gray-300 shadow-md rounded-3xl"
      action={action}
    >
      <div className="rounded-2xl bg-gray-100">
        <input
          type="text"
          name="name"
          className="border-none rounded-t-xl rounded-b-sm px-6 pt-4 pb-2 w-full text-lg outline-none font-medium"
          placeholder="Product Name"
          required
        />
        <textarea
          name="description"
          className="border-none rounded-b-xl px-6 pb-4 pt-2 w-full text-base outline-none resize-none"
          rows={3}
          placeholder="Description (optional)"
        />
      </div>
      <div className="px-3 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select name="category" required>
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
            defaultValue={new Date()}
          />
          <DatePicker
            title="Expiration"
            name="expirationDate"
            defaultValue={new Date()}
          />
        </div>

        <Button type="submit" variant="action" disabled={pending}>
          {pending ? (
            <Loader className="animate-spin size-5" />
          ) : (
            <Plus className="size-5" />
          )}
          {pending ? "Adding..." : "Add Item"}
        </Button>
      </div>
    </form>
  );
}
