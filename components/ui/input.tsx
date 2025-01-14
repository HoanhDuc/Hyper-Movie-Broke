import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div>
        <p className="mb-2 font-bold text-sm lg:text-base">Tên phim, diễn viên...</p>
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-transparent",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
)
Input.displayName = "Input"

export { Input }
