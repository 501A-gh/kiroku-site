"use client";
import { db } from "@/firebase";
import { FirestoreItem } from "@/types";
import { collection, orderBy, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { categories } from "./Input";
import Item from "./Item";

const maxDays = 10; // Maximum number of days for the chart

export type ItemData = FirestoreItem & {
  id: string;
};

export default function ItemList({ userId }: { userId: string }) {
  type SortOption = "datePurchased" | "expirationDate";

  const [sort, setSort] = useState<SortOption>("datePurchased");
  const [filter, setFilter] = useState<string>("none");
  const [value, loading, error] = useCollection(
    query(
      collection(db, "users", userId, "items"),
      orderBy(sort),
      where(
        "category",
        filter == "none" ? "!=" : "==",
        filter == "none" ? "none" : filter
      ),
      where("finished", "==", false)
    )
  );

  const data =
    value?.docs.map((doc) => ({ ...doc.data(), id: doc.id } as ItemData)) || [];

  return (
    <section className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h4>All Items</h4>
        <div className="flex items-center gap-2">
          <Select name="category" defaultValue="none" onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="none" className="capitalize">
                All Items
              </SelectItem>
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
          <Select
            defaultValue={sort}
            onValueChange={(value) => setSort(value as SortOption)}
            name="sort"
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="datePurchased" className="capitalize">
                Date Purchased
              </SelectItem>
              <SelectItem value="expirationDate" className="capitalize">
                Expiration Date
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {loading ? (
          <div className="flex items-center justify-center col-span-2">
            Loading...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center col-span-2">
            Error: {error.message}
          </div>
        ) : (
          data.map((itemData) => (
            <Item
              key={itemData.id}
              data={itemData}
              maxDays={maxDays}
              userId={userId}
            />
          ))
        )}
      </div>
    </section>
  );
}
