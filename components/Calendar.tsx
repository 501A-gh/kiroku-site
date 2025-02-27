"use client";

import { cn } from "@/utils";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "react-feather";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col gap-2 relative",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1 absolute h-7 w-full z-10",
        button_previous: cn(
          "size-4 bg-transparent p-0 opacity-50 hover:opacity-100",
          "absolute left-1 flex items-center justify-center"
        ),
        button_next: cn(
          "size-4 bg-transparent p-0 opacity-50 hover:opacity-100",
          "absolute right-1 flex items-center justify-center"
        ),
        month_grid: "w-full border-collapse space-x-1",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day_button: cn("size-8 p-0 font-normal aria-selected:opacity-100"),
        range_start: "day-range-start",
        range_end: "day-range-end",
        selected:
          "bg-emerald-500 rounded-lg text-white font-bold text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today:
          "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground",
        outside: "aria-selected:text-white text-zinc-400",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...props }) => (
          <>
            {orientation === "left" && <ChevronLeft {...props} />}
            {orientation === "right" && <ChevronRight {...props} />}
          </>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
