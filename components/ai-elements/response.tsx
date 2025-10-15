"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

export function Response({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={cn("prose prose-base dark:prose-invert max-w-none prose-p:leading-7 prose-pre:bg-muted prose-pre:border prose-pre:border-border", className)}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}
