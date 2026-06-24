import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Cadus Landing — Typography
 * ----------------------------------------------------------------------------
 * Type scale para a landing page (cadus-landing).
 *
 * Estende a escala do Cadus DS (desenhada para a aplicação, teto em h1=36px)
 * com um "display tier" para o hero e seções de impacto. Todos os tamanhos
 * acima de h4 usam clamp() para escalar fluidamente entre mobile e desktop
 * sem depender de breakpoints.
 *
 * Famílias (CSS vars já definidas no cadus-ds):
 *   --font-display → Archivo        (display + headings)
 *   --font-body    → Public Sans    (corpo)
 *   --font-mono    → IBM Plex Mono  (overline + code)
 *
 * ── Escala ──────────────────────────────────────────────────────────────────
 *  variante      família      px (min→max)   peso   leading   tracking
 *  display-xl    Archivo      44 → 80        800    1.0       -0.03em   (hero)
 *  display-lg    Archivo      36 → 60        800    1.04      -0.025em
 *  display-md    Archivo      30 → 44        700    1.08      -0.02em
 *  h1            Archivo      28 → 36        700    1.1       -0.02em
 *  h2            Archivo      24 → 30        600    1.15      -0.015em
 *  h3            Archivo      24             600    1.2       -0.01em
 *  h4            Archivo      20             600    1.25      -0.01em
 *  lead          Public Sans  18 → 22        400    1.55      —         (subtítulo hero)
 *  body-lg       Public Sans  18             400    1.7       —
 *  body          Public Sans  16             400    1.7       —
 *  body-sm       Public Sans  14             400    1.6       —
 *  overline      IBM Plex Mono 13            500    1         0.1em  uppercase
 *  caption       Public Sans  13             400    1.5       —
 *  quote         Public Sans  16 (italic)    400    1.6       —         border-left
 *  code          IBM Plex Mono 14            500    1         —         inline
 * ─────────────────────────────────────────────────────────────────────────────
 */

const typographyVariants = cva("", {
  variants: {
    variant: {
      "display-xl":
        "font-[family-name:var(--font-display)] font-extrabold text-[clamp(2.75rem,5.5vw+1rem,5rem)] leading-[1.0] tracking-[-0.03em] text-balance",
      "display-lg":
        "font-[family-name:var(--font-display)] font-extrabold text-[clamp(2.25rem,3.5vw+1rem,3.75rem)] leading-[1.04] tracking-[-0.025em] text-balance",
      "display-md":
        "font-[family-name:var(--font-display)] font-bold text-[clamp(1.875rem,2.5vw+1rem,2.75rem)] leading-[1.08] tracking-[-0.02em] text-balance",
      h1: "font-[family-name:var(--font-display)] font-bold text-[clamp(1.75rem,2vw+1rem,2.25rem)] leading-[1.1] tracking-[-0.02em]",
      h2: "font-[family-name:var(--font-display)] font-semibold text-[clamp(1.5rem,1.5vw+0.75rem,1.875rem)] leading-[1.15] tracking-[-0.015em]",
      h3: "font-[family-name:var(--font-display)] font-semibold text-2xl leading-[1.2] tracking-[-0.01em]",
      h4: "font-[family-name:var(--font-display)] font-semibold text-xl leading-[1.25] tracking-[-0.01em]",
      lead: "font-[family-name:var(--font-body)] text-[clamp(1.125rem,1vw+0.75rem,1.375rem)] leading-[1.55] text-muted-foreground",
      "body-lg":
        "font-[family-name:var(--font-body)] text-lg leading-[1.7]",
      body: "font-[family-name:var(--font-body)] text-base leading-[1.7]",
      "body-sm":
        "font-[family-name:var(--font-body)] text-sm leading-[1.6]",
      overline:
        "font-[family-name:var(--font-mono)] text-[0.8125rem] font-medium uppercase leading-none tracking-[0.1em] text-muted-foreground",
      caption:
        "font-[family-name:var(--font-body)] text-[0.8125rem] leading-[1.5] text-muted-foreground",
      quote:
        "font-[family-name:var(--font-body)] italic text-base leading-[1.6] border-l-2 border-border pl-4 text-foreground/80",
      code: "font-[family-name:var(--font-mono)] text-sm font-medium bg-muted rounded px-1.5 py-0.5",
    },
  },
  defaultVariants: {
    variant: "body",
  },
})

type TypographyVariant = NonNullable<
  VariantProps<typeof typographyVariants>["variant"]
>

// Elemento HTML padrão de cada variante (sobrescrevível via `as` ou `asChild`).
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
  /** Renderiza usando o filho como elemento (Radix Slot). */
  asChild?: boolean
  /** Sobrescreve o elemento HTML padrão da variante. */
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
