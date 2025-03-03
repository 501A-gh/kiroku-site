"use client";

import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { toast as sonnerToast } from "sonner";

interface ToastProps {
  title: string;
  description: string;
  state: VariantProps<typeof toastVariants>["state"];
}

export default function toast(toast: ToastProps) {
  return sonnerToast.custom(() => <Toast {...toast} />);
}

const toastVariants = cva(
  "flex rounded-2xl shadow-lg w-96 items-center p-4 border",
  {
    variants: {
      state: {
        default: "bg-white border-zinc-200 text-zinc-900",
        error: "bg-red-500 border-red-400  text-white",
        warning: "bg-amber-500 border-amber-400 text-white",
        success: "bg-emerald-500 border-emerald-400 text-white ",
      },
    },
  }
);

function Toast({ title, description, state }: ToastProps) {
  return (
    <div className={toastVariants({ state })}>
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="text-base font-medium text-inherit">{title}</p>
          <p className="mt-1 text-sm text-inherit opacity-95">{description}</p>
        </div>
      </div>
    </div>
  );
}
