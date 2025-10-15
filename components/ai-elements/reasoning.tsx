"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import * as Collapsible from "@radix-ui/react-collapsible";
import { BrainIcon, ChevronDownIcon } from "lucide-react";

export function Reasoning({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  isStreaming?: boolean;
}) {
  return (
    <Collapsible.Root className={cn("mb-4 border rounded-lg p-4", className)}>
      {children}
    </Collapsible.Root>
  );
}

export function ReasoningTrigger({ className }: { className?: string }) {
  return (
    <Collapsible.Trigger
      className={cn(
        "flex items-center gap-2 text-sm font-medium hover:text-muted-foreground transition-colors w-full",
        className
      )}
    >
      <BrainIcon className="h-4 w-4" />
      <span>Reasoning</span>
      <ChevronDownIcon className="h-4 w-4 ml-auto" />
    </Collapsible.Trigger>
  );
}

export function ReasoningContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Collapsible.Content className={cn("mt-2 text-sm text-muted-foreground", className)}>
      {children}
    </Collapsible.Content>
  );
}
