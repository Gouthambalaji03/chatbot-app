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
        from === "assistant" ? "bg-muted/30" : "bg-background",
        className
      )}
    >
      <div className="w-full max-w-3xl">
        <div className={cn(
          "flex gap-4",
          from === "user" ? "flex-row-reverse" : "flex-row"
        )}>
          <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
            {from === "user" ? (
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                U
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                AI
              </div>
            )}
          </div>
          <div className={cn(
            "flex-1 space-y-2 overflow-hidden",
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
