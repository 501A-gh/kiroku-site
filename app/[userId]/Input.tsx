"use client";
import { DatePicker } from "@/components/DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { db } from "@/firebase";
import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useActionState, useEffect } from "react";
import { Loader, Plus } from "react-feather";

const categories: string[] = [
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
        await addDoc(collection(db, "users", user.uid, "items"), {
          name: String(formData.get("name")),
          description: String(formData.get("description")),
          datePurchased: new Date(String(formData.get("datePurchased"))),
          expirationDate: new Date(String(formData.get("expirationDate"))),
          category: String(formData.get("category")),
        });
      }
      return {
        success: true,
        message: "Item added successfully",
      };
    },
    undefined
  );

  useEffect(() => {
    if (state?.success) console.log("Item added:", state);
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
        <input
          type="text"
          name="description"
          className="border-none rounded-b-xl px-6 pb-4 pt-2 w-full text-base outline-none"
          placeholder="Description (optional)"
        />
      </div>
      <div className="px-3 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select name="category" required>
            <SelectTrigger className="w-fit bg-white border border-zinc-200 rounded-xl capitalize">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto bg-white border-zinc-200 shadow-md rounded-xl">
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
          <DatePicker title="Purchase" name="datePurchased" />
          <DatePicker title="Expiration" name="expirationDate" />
        </div>

        <button className="bg-emerald-500 font-semibold text-white rounded-full px-3 py-1.5 flex items-center gap-1 transition duration-200 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 cursor-pointer active:scale-95 active:duration-300">
          {pending ? (
            <Loader className="animate-spin size-5" />
          ) : (
            <Plus className="size-5" />
          )}
          {pending ? "Adding..." : "Add Item"}
        </button>
      </div>
    </form>
  );
}
