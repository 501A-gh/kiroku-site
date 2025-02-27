"use client";
import { db } from "@/firebase";
import { Item } from "@/types";
import { collection } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { motion, AnimatePresence } from "motion/react";

export default function Items({ userId }: { userId: string }) {
  const [value, loading, error] = useCollection(
    collection(db, "users", userId, "items")
  );

  const data =
    value?.docs.map((doc) => ({ ...(doc.data() as Item), id: doc.id })) || [];

  return (
    <div className="w-full flex flex-col gap-4">
      <h4>All Items</h4>
      <div className="grid grid-cols-3 gap-4">
        <AnimatePresence>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : (
            data.map((doc, i) => (
              <motion.div
                key={doc.id}
                className="bg-white border border-zinc-200 p-4 rounded-2xl shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  type: "spring",
                  delay: 0.1 * i,
                }}
              >
                <h5>{doc.name}</h5>
                <p>{doc.description}</p>
                <p>
                  Purchased: {doc.datePurchased.toDate().toLocaleDateString()}
                </p>
                <p>
                  Expires: {doc.expirationDate.toDate().toLocaleDateString()}
                </p>
                <p>Category: {doc.category}</p>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
