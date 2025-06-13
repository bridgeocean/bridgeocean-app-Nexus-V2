"use client"

import * as React from "react"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    maxLength?: number
    render?: ({ slots }: { slots: React.ReactNode[] }) => React.ReactNode
  }
>(({ className, maxLength = 6, render, ...props }, ref) => {
  const [value, setValue] = React.useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, maxLength)
    setValue(newValue)
    if (props.onChange) {
      props.onChange(e)
    }
  }

  const slots = Array.from({ length: maxLength }, (_, i) => (
    <div
      key={i}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        value.length === i && "z-10 ring-2 ring-ring ring-offset-background",
        className,
      )}
    >
      {value[i] || ""}
    </div>
  ))

  if (render) {
    return (
      <div className="flex items-center gap-2">
        <input ref={ref} value={value} onChange={handleChange} className="sr-only" {...props} />
        {render({ slots })}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <input ref={ref} value={value} onChange={handleChange} className="sr-only" {...props} />
      <div className="flex">{slots}</div>
    </div>
  )
})
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center", className)} {...props} />,
)
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    index: number
  }
>(({ index, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        className,
      )}
      {...props}
    />
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
      <Dot />
    </div>
  ),
)
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
