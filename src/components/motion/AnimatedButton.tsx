import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  /** Ícone Lucide exibido no estado normal (à esquerda). */
  icon: LucideIcon
}

const swap = {
  initial: { opacity: 0, scale: 0.6 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.6 },
  transition: { duration: 0.18, ease: "easeOut" },
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
      <AnimatePresence mode="wait" initial={false}>
        {hovered ? (
          <motion.span
            key="arrow"
            className="order-last inline-flex"
            aria-hidden
            {...swap}
          >
            <ArrowUpRight />
          </motion.span>
        ) : (
          <motion.span key="icon" className="inline-flex" aria-hidden {...swap}>
            <Icon />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="order-2">{label}</span>
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
