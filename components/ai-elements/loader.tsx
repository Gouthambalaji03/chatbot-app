"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-muted-foreground", className)}>
      <div className="flex gap-1">
        <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-sm">Thinking...</span>
    </div>
  );
}
