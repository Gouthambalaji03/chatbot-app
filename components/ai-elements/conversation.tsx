"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConversationContext = React.createContext<{
  scrollRef: React.RefObject<HTMLDivElement | null>;
}>({
  scrollRef: { current: null },
});

export function Conversation({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <ConversationContext.Provider value={{ scrollRef }}>
      <div className={cn("flex flex-col", className)}>{children}</div>
    </ConversationContext.Provider>
  );
}

export function ConversationContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { scrollRef } = React.useContext(ConversationContext);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [children, scrollRef]);

  return (
    <div
      ref={scrollRef}
      className={cn("flex-1 overflow-y-auto", className)}
    >
      {children}
    </div>
  );
}

export function ConversationScrollButton() {
  const { scrollRef } = React.useContext(ConversationContext);
  const [showScroll, setShowScroll] = React.useState(false);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        setShowScroll(scrollHeight - scrollTop - clientHeight > 100);
      }
    };

    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
      return () => ref.removeEventListener("scroll", handleScroll);
    }
  }, [scrollRef]);

  if (!showScroll) return null;

  return (
    <Button
      onClick={scrollToBottom}
      size="icon"
      className="absolute bottom-24 right-8 rounded-full shadow-lg"
    >
      <ArrowDownIcon className="h-4 w-4" />
    </Button>
  );
}
