"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDownIcon, ExternalLinkIcon } from "lucide-react";

export function Sources({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Collapsible.Root className={cn("mb-4", className)}>
      {children}
    </Collapsible.Root>
  );
}

export function SourcesTrigger({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  return (
    <Collapsible.Trigger
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
        className
      )}
    >
      <span>{count} source{count !== 1 ? 's' : ''}</span>
      <ChevronDownIcon className="h-4 w-4" />
    </Collapsible.Trigger>
  );
}

export function SourcesContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Collapsible.Content className={cn("mt-2", className)}>
      {children}
    </Collapsible.Content>
  );
}

export function Source({
  href,
  title,
  className,
}: {
  href: string;
  title: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300",
        className
      )}
    >
      <ExternalLinkIcon className="h-3 w-3" />
      <span className="truncate">{title}</span>
    </a>
  );
}
