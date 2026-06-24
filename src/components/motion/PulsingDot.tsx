import * as React from "react"

import { cn } from "@/lib/utils"

export interface PulsingDotProps extends React.ComponentProps<"span"> {
  /** Cor do ponto — CSS custom property, ex.: "var(--mata-600)". */
  color: string
  /** Tamanho em unidades Tailwind (1 = 0.25rem). Default "2" = 8px. */
  size?: string
}

/**
 * Indicador de status com pulse: dois layers quadrados sobrepostos (um
 * "pixel gigante"). O de baixo usa `animate-ping` (escala + fade em loop);
 * o de cima é estático, marcando a cor sólida.
 *
 * O tamanho é dinâmico, então é resolvido via `calc(var(--spacing) * size)`
 * em vez de classes `size-*` (que o Tailwind não consegue gerar em runtime).
 */
function PulsingDot({ color, size = "2", className, ...props }: PulsingDotProps) {
  const side = `calc(var(--spacing) * ${size})`

  return (
    <span
      aria-hidden
      className={cn("relative inline-block shrink-0", className)}
      style={{ width: side, height: side }}
      {...props}
    >
      <span
        className="absolute inset-0 animate-ping opacity-75"
        style={{ backgroundColor: color }}
      />
      <span
        className="relative block size-full"
        style={{ backgroundColor: color }}
      />
    </span>
  )
}

export { PulsingDot }
