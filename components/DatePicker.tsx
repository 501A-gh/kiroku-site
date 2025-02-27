"use client";

import * as React from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Calendar } from "@/components/Calendar";
import { Calendar as CalendarIcon } from "react-feather";

export function DatePicker({
  title = "Select a date",
  name,
}: {
  title?: string;
  name: string;
}) {
  const [date, setDate] = React.useState<Date>();

  return (
    <>
      <Popover>
        <PopoverTrigger className="flex w-full items-center gap-1.5 whitespace-nowrap px-3 py-2 text-sm font-medium shadow-xs cursor-pointer focus:outline-none bg-white border border-zinc-200 rounded-xl">
          <CalendarIcon className="size-4 opacity-50" />
          {date ? format(date, "PPP") : <span>{title}</span>}
        </PopoverTrigger>
        <PopoverContent
          className="w-auto bg-white border border-zinc-200 p-0 rounded-2xl shadow-md min-w-60"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <input type="hidden" name={name} value={date ? date.toISOString() : ""} />
    </>
  );
}
