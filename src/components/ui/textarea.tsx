
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onEnterPressed?: () => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onEnterPressed, ...props }, ref) => {
    // Add support for controlling value via value prop and handle Enter key press
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && onEnterPressed) {
        e.preventDefault();
        onEnterPressed();
      }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { onChange } = props;
      if (onChange) onChange(e);
    };
    
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
