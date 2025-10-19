"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as Select from "@radix-ui/react-select";
import {
  PaperclipIcon,
  SendIcon,
  ChevronDownIcon,
  XIcon,
  MoreHorizontalIcon,
  StopCircleIcon,
} from "lucide-react";

export type PromptInputMessage = {
  text: string;
  files?: File[];
};

type PromptInputContextType = {
  files: File[];
  addFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
  onSubmit: (message: PromptInputMessage) => void;
  textValue: string;
  setTextValue: (value: string) => void;
};

const PromptInputContext = React.createContext<PromptInputContextType>({
  files: [],
  addFiles: () => {},
  removeFile: () => {},
  onSubmit: () => {},
  textValue: "",
  setTextValue: () => {},
});

export function PromptInput({
  children,
  onSubmit,
  className,
  globalDrop,
  multiple,
}: {
  children: React.ReactNode;
  onSubmit: (message: PromptInputMessage) => void;
  className?: string;
  globalDrop?: boolean;
  multiple?: boolean;
}) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [textValue, setTextValue] = React.useState<string>("");

  const addFiles = React.useCallback((newFiles: File[]) => {
    setFiles((prev) => (multiple ? [...prev, ...newFiles] : newFiles));
  }, [multiple]);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  React.useEffect(() => {
    if (!globalDrop) return;

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer?.files) {
        addFiles(Array.from(e.dataTransfer.files));
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener("drop", handleDrop);
    document.addEventListener("dragover", handleDragOver);

    return () => {
      document.removeEventListener("drop", handleDrop);
      document.removeEventListener("dragover", handleDragOver);
    };
  }, [globalDrop, addFiles]);

  return (
    <PromptInputContext.Provider value={{ files, addFiles, removeFile, onSubmit, textValue, setTextValue }}>
      <div className={cn("border-2 border-gray-300 dark:border-gray-600 rounded-2xl shadow-xl bg-white dark:bg-gray-800 focus-within:border-green-500 dark:focus-within:border-green-500 transition-all duration-200", className)}>{children}</div>
    </PromptInputContext.Provider>
  );
}

export function PromptInputBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("p-4", className)}>{children}</div>;
}

export function PromptInputTextarea({
  value,
  onChange,
  className,
  placeholder = "Type a message...",
}: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
}) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const { textValue, setTextValue } = React.useContext(PromptInputContext);

  // Use context value if no value prop is provided
  const actualValue = value !== undefined ? value : textValue;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
    setTextValue(e.target.value);
  };

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [actualValue]);

  return (
    <textarea
      ref={textareaRef}
      value={actualValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={cn(
        "w-full resize-none border-0 bg-transparent focus:outline-none focus:ring-0 text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 leading-7 font-medium",
        className
      )}
      rows={1}
      style={{ maxHeight: "200px" }}
    />
  );
}

export function PromptInputAttachments({
  children,
}: {
  children: (file: File, index: number) => React.ReactNode;
}) {
  const { files } = React.useContext(PromptInputContext);

  if (files.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {files.map((file, index) => children(file, index))}
    </div>
  );
}

export function PromptInputAttachment({ data }: { data: { file: File; index: number } }) {
  const { removeFile } = React.useContext(PromptInputContext);
  const { file, index } = data;

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md text-sm">
      <PaperclipIcon className="h-4 w-4" />
      <span className="truncate max-w-[200px]">{file.name}</span>
      <button
        onClick={() => removeFile(index)}
        className="ml-auto hover:text-destructive"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

export function PromptInputToolbar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 py-3", className)}>
      {children}
    </div>
  );
}

export function PromptInputTools({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex items-center gap-3", className)}>{children}</div>;
}

export function PromptInputSubmit({
  disabled,
  status,
  className,
}: {
  disabled?: boolean;
  status?: string;
  className?: string;
}) {
  const { files, onSubmit, textValue, setTextValue } = React.useContext(PromptInputContext);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (textValue.trim() || files.length > 0) {
      onSubmit({ text: textValue, files });
      setTextValue("");
    }
  };

  return (
    <Button
      type="button"
      size="icon"
      disabled={disabled}
      className={className}
      onClick={handleSubmit}
    >
      {status === "streaming" ? (
        <StopCircleIcon className="h-4 w-4" />
      ) : (
        <SendIcon className="h-4 w-4" />
      )}
    </Button>
  );
}

export function PromptInputButton({
  children,
  onClick,
  variant = "ghost",
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "ghost";
  className?: string;
}) {
  return (
    <Button 
      variant={variant} 
      size="sm" 
      onClick={onClick} 
      className={cn(
        "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
        className
      )}
    >
      {children}
    </Button>
  );
}

export function PromptInputActionMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)}>{children}</div>
      {open && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export function PromptInputActionMenuTrigger({ className }: { className?: string }) {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={cn(
        "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
        className
      )}
    >
      <MoreHorizontalIcon className="h-4 w-4" />
    </Button>
  );
}

export function PromptInputActionMenuContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-2 z-50 w-48",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PromptInputActionAddAttachments({ className }: { className?: string }) {
  const { addFiles } = React.useContext(PromptInputContext);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 h-auto",
          className
        )}
      >
        <PaperclipIcon className="h-4 w-4 mr-2" />
        <span>Add attachments</span>
      </Button>
    </>
  );
}

export function PromptInputModelSelect({
  children,
  value,
  onValueChange,
}: {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      {children}
    </Select.Root>
  );
}

export function PromptInputModelSelectTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Select.Trigger
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-accent",
        className
      )}
    >
      {children}
      <Select.Icon>
        <ChevronDownIcon className="h-4 w-4" />
      </Select.Icon>
    </Select.Trigger>
  );
}

export function PromptInputModelSelectValue() {
  return <Select.Value />;
}

export function PromptInputModelSelectContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Select.Portal>
      <Select.Content
        className={cn(
          "bg-popover border rounded-md shadow-md p-1 z-50",
          className
        )}
      >
        <Select.Viewport>{children}</Select.Viewport>
      </Select.Content>
    </Select.Portal>
  );
}

export function PromptInputModelSelectItem({
  children,
  value,
  className,
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
}) {
  return (
    <Select.Item
      value={value}
      className={cn(
        "px-3 py-2 text-sm rounded-sm hover:bg-accent cursor-pointer outline-none",
        className
      )}
    >
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
}
