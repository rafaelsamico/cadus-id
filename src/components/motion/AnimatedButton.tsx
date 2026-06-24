import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  /** Ícone Lucide exibido no estado normal (à esquerda). */
  icon: LucideIcon
}

// Spring suave compartilhada por todo o movimento — dá o deslize orgânico.
const spring = { type: "spring", stiffness: 320, damping: 30, mass: 0.7 } as const

// Ícone normal (à esquerda): entra/sai deslizando pela esquerda.
const iconSwap = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -8 },
  transition: spring,
} as const

// ArrowUpRight (à direita): entra/sai deslizando pela direita.
const arrowSwap = {
  initial: { opacity: 0, x: 8 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 8 },
  transition: spring,
} as const

/**
 * Botão com troca de ícone animada no hover: no estado normal mostra `icon`
 * à esquerda; no hover esse ícone sai e entra um `ArrowUpRight` à direita,
 * sinalizando navegação. O estado de hover é interno e não é exposto ao pai.
 */
function AnimatedButton({
  icon: Icon,
  children,
  asChild,
  ...props
}: AnimatedButtonProps) {
  const [hovered, setHovered] = React.useState(false)

  const hoverHandlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  }

  const content = (label: React.ReactNode) => (
    <span className="inline-flex items-center gap-2">
      <AnimatePresence mode="popLayout" initial={false}>
        {hovered ? (
          <motion.span
            key="arrow"
            className="order-last inline-flex"
            aria-hidden
            {...arrowSwap}
          >
            <ArrowUpRight />
          </motion.span>
        ) : (
          <motion.span
            key="icon"
            className="inline-flex"
            aria-hidden
            {...iconSwap}
          >
            <Icon />
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span layout className="order-2" transition={spring}>
        {label}
      </motion.span>
    </span>
  )

  // asChild: o filho (ex.: <Link>) é clonado para receber os handlers de hover
  // e ter seu conteúdo envolvido pela estrutura animada, preservando a navegação.
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ children?: React.ReactNode }>

    return (
      <Button asChild {...props}>
        {React.cloneElement(
          child,
          hoverHandlers,
          content(child.props.children)
        )}
      </Button>
    )
  }

  return (
    <Button {...props} {...hoverHandlers}>
      {content(children)}
    </Button>
  )
}

export { AnimatedButton }
