import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const typographyVariants = cva("", {
  variants: {
    variant: {
      "display-xl":
        "font-display font-extrabold text-[clamp(2.75rem,5.5vw+1rem,5rem)] leading-[1.0] tracking-[-0.03em] text-balance",
      "display-lg":
        "font-display font-extrabold text-[clamp(2.25rem,3.5vw+1rem,3.75rem)] leading-[1.04] tracking-[-0.025em] text-balance",
      "display-md":
        "font-display font-bold text-[clamp(1.875rem,2.5vw+1rem,2.75rem)] leading-[1.08] tracking-[-0.02em] text-balance",
      h1: "font-display font-bold text-[clamp(1.75rem,2vw+1rem,2.25rem)] leading-[1.1] tracking-[-0.02em]",
      h2: "font-display font-semibold text-[clamp(1.5rem,1.5vw+0.75rem,1.875rem)] leading-[1.15] tracking-[-0.015em]",
      h3: "font-display font-semibold text-2xl leading-[1.2] tracking-[-0.01em]",
      h4: "font-display font-semibold text-xl leading-[1.25] tracking-[-0.01em]",
      lead: "font-sans text-[clamp(1.125rem,1vw+0.75rem,1.375rem)] leading-[1.55] text-muted-foreground",
      "body-lg":
        "font-sans text-lg leading-[1.7]",
      body: "font-sans text-base leading-[1.7]",
      "body-sm":
        "font-sans text-sm leading-[1.6]",
      overline:
        "font-mono text-[0.8125rem] font-medium uppercase leading-none tracking-[0.1em] text-muted-foreground",
      caption:
        "font-sans text-[0.8125rem] leading-[1.5] text-muted-foreground",
      quote:
        "font-sans italic text-base leading-[1.6] border-l-2 border-border pl-4 text-foreground/80",
      code: "font-mono text-sm font-medium bg-muted rounded px-1.5 py-0.5",
    },
  },
  defaultVariants: {
    variant: "body",
  },
})

type TypographyVariant = NonNullable<
  VariantProps<typeof typographyVariants>["variant"]
>

const variantElementMap: Record<TypographyVariant, React.ElementType> = {
  "display-xl": "h1",
  "display-lg": "h2",
  "display-md": "h2",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  lead: "p",
  "body-lg": "p",
  body: "p",
  "body-sm": "p",
  overline: "span",
  caption: "span",
  quote: "blockquote",
  code: "code",
}

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean
  as?: React.ElementType
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "body", as, asChild = false, ...props }, ref) => {
    const Comp = asChild
      ? Slot
      : as ?? variantElementMap[variant ?? "body"] ?? "p"

    return (
      <Comp
        ref={ref}
        className={cn(typographyVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Typography.displayName = "Typography"

export { Typography, typographyVariants }
export type { TypographyVariant }
