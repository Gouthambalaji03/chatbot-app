"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Message({
  children,
  from,
  className,
}: {
  children: React.ReactNode;
  from: "user" | "assistant";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full flex justify-center py-6 px-4",
        from === "assistant" ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900",
        className
      )}
    >
      <div className="w-full max-w-4xl">
        <div className={cn(
          "flex gap-4 items-start",
          from === "user" ? "flex-row-reverse" : "flex-row"
        )}>
          <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
            {from === "user" ? (
              <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center">
                U
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            )}
          </div>
          <div className={cn(
            "flex-1 space-y-2 overflow-hidden min-w-0",
            from === "user" ? "flex flex-col items-end" : ""
          )}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MessageContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("text-base leading-7", className)}>{children}</div>;
}
