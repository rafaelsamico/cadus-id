import * as React from "react"

import { cn } from "@/lib/utils"
import { Typography } from "@/components/ui/typography"

export interface MarqueeProps extends React.ComponentProps<"div"> {
  /** Itens a exibir em loop (ex.: nomes das clínicas). */
  items: string[]
  /** Duração de um ciclo completo, em segundos. */
  speed?: number
}

/** Uma sequência de itens com separadores — renderizada duas vezes pro loop. */
function MarqueeRow({
  items,
  ...props
}: { items: string[] } & React.ComponentProps<"div">) {
  return (
    <div className="flex shrink-0 items-center" {...props}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <Typography as="span" variant="overline" className="px-6">
            {item}
          </Typography>
          <span aria-hidden className="text-(--barro-600)">
            ·
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}

/**
 * Marquee horizontal com loop infinito que pausa no hover.
 *
 * Os itens rolam da direita para a esquerda via CSS animation (mais
 * performático que JS para scroll contínuo). O conteúdo é duplicado e a
 * animação desloca -50%, então o ponto de emenda é invisível. Respeita
 * `prefers-reduced-motion`: sem movimento, os itens ficam estáticos.
 */
function Marquee({ items, speed = 30, className, ...props }: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        // fade nas bordas esquerda/direita
        "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        "[-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex w-max",
          // anima só quando movimento é permitido; pausa no hover
          "motion-safe:animate-[marquee_var(--marquee-speed)_linear_infinite]",
          "group-hover:[animation-play-state:paused]"
        )}
        style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
      >
        <MarqueeRow items={items} />
        <MarqueeRow items={items} aria-hidden />
      </div>
    </div>
  )
}

export { Marquee }
