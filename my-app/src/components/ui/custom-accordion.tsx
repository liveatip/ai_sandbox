"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon, PinIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function CustomAccordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="custom-accordion" {...props} />
}

function CustomAccordionItem({
  className,
  maxHeight,
  marginLeft = 6,
  marginRight = 6,
  bottomMargin = 4,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item> & {
  maxHeight?: string
  marginLeft?: number
  marginRight?: number
  bottomMargin?: number
}) {
  return (
    <AccordionPrimitive.Item
      data-slot="custom-accordion-item"
      className={cn(
        "border border-slate-200 dark:border-slate-700 rounded-lg mb-4 last:mb-0 shadow-sm",
        className
      )}
      data-max-height={maxHeight}
      data-margin-left={marginLeft}
      data-margin-right={marginRight}
      data-bottom-margin={bottomMargin}
      {...props}
    />
  )
}

function CustomAccordionTrigger({
  className,
  children,
  isPinned,
  onPinToggle,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  isPinned?: boolean
  onPinToggle?: () => void
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="custom-accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-t-lg py-6 text-center text-base font-semibold transition-all outline-none hover:bg-slate-50 dark:hover:bg-slate-800 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180 border-b border-slate-200 dark:border-slate-700 px-6",
          className
        )}
        {...props}
      >
        {onPinToggle && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onPinToggle()
            }}
            className={cn(
              "p-2 rounded-md transition-colors hover:bg-slate-200 dark:hover:bg-slate-700",
              isPinned 
                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" 
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            )}
            title={isPinned ? "Unpin section" : "Pin section"}
          >
            <PinIcon className={cn("size-4", isPinned && "rotate-45")} />
          </button>
        )}
        <span className="flex-1 text-center">{children}</span>
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function CustomAccordionContent({
  className,
  children,
  maxHeight,
  marginLeft = 6,
  marginRight = 6,
  bottomMargin = 4,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content> & {
  maxHeight?: string
  marginLeft?: number
  marginRight?: number
  bottomMargin?: number
}) {
  return (
    <AccordionPrimitive.Content
      data-slot="custom-accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div 
        className={cn(
          className
        )}
        style={{
          maxHeight: maxHeight || 'none',
          paddingLeft: `${marginLeft * 0.25}rem`,
          paddingRight: `${marginRight * 0.25}rem`,
          paddingTop: '1rem',
          paddingBottom: `${bottomMargin * 0.25}rem`
        }}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { CustomAccordion, CustomAccordionItem, CustomAccordionTrigger, CustomAccordionContent } 