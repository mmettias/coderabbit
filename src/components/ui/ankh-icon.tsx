import * as React from "react"
import { cn } from "@/lib/utils"

interface AnkhIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

const AnkhIcon = React.forwardRef<SVGSVGElement, AnkhIconProps>(
  ({ className, size = 24, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("text-primary", className)}
        {...props}
      >
        <circle cx="12" cy="8" r="3" />
        <path d="M12 11v10" />
        <path d="M8 15h8" />
      </svg>
    )
  }
)
AnkhIcon.displayName = "AnkhIcon"

export { AnkhIcon }