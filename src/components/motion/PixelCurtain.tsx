import * as React from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react"
import { useLocation } from "react-router-dom"

/** Evento disparado no instante em que a cortina começa a revelar (sair). */
export const CURTAIN_REVEAL_EVENT = "pixelcurtain:reveal"

// Flag global: indica que uma cortina está em curso (cobrindo ou segurando),
// ou seja, a tela está/ficará coberta antes de revelar. Componentes podem
// consultar para sincronizar (ex.: o ScrambleText só inicia ao revelar).
let curtainBusy = false
export function isCurtainBusy() {
  return curtainBusy
}

/** Cores dos pixels quando a rota não tem cor sólida própria (home). */
const HOME_COLOR = "var(--areia-100)"

export interface PixelCurtainProps {
  /** Lado de cada pixel da grade, em px. */
  pixelSize?: number
  /**
   * Janela máxima de atraso aleatório por pixel, em segundos. Define o teto da
   * duração do dissolve — independente da quantidade de pixels / tamanho da
   * tela.
   */
  spread?: number
  /** Tempo, em segundos, que a tela fica totalmente coberta antes de revelar. */
  hold?: number
  /**
   * Chamado quando a tela está totalmente coberta (antes do hold/reveal). É o
   * momento de trocar o conteúdo por baixo, escondido — evita ver a página nova
   * antes da transição.
   */
  onCovered?: () => void
}

/**
 * Cortina de pixels que cobre e revela a tela a cada troca de rota. Cada pixel
 * surge e some com um atraso aleatório dentro de uma janela (`spread`), criando
 * um efeito de dissolve — a duração total é limitada pela janela, independente
 * de quantos pixels existem na tela. Ao cobrir por completo, segura a tela
 * pintada por `hold` segundos antes de revelar.
 *
 * Cor por rota de destino: `/pacientes` = mata, `/profissionais` = barro, demais
 * (home) = areia do fundo. A presença do overlay é controlada por
 * `AnimatePresence`; quando a cobertura completa e o hold termina, dispara o
 * evento `CURTAIN_REVEAL_EVENT` e sai (exit), dissolvendo a cobertura.
 *
 * Respeita `prefers-reduced-motion`: nesse caso a animação é pulada por
 * completo (o overlay nunca aparece).
 */
function PixelCurtain({
  pixelSize = 80,
  spread = 0.3,
  hold = 0.25,
  onCovered,
}: PixelCurtainProps) {
  const reduced = useReducedMotion()
  const { pathname } = useLocation()

  const [active, setActive] = React.useState(false)
  const [size, setSize] = React.useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 0,
    h: typeof window !== "undefined" ? window.innerHeight : 0,
  }))

  // Não dispara no primeiro render — só nas trocas de rota seguintes.
  const mounted = React.useRef(false)
  const holdTimer = React.useRef(0)

  React.useEffect(() => {
    const onResize = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (reduced) return
    // Marca já no commit da navegação (antes dos effects dos filhos), para que
    // quem consulta isCurtainBusy() saiba que a tela vai ser coberta.
    curtainBusy = true
    setActive(true)
  }, [pathname, reduced])

  React.useEffect(() => () => window.clearTimeout(holdTimer.current), [])

  const cols = Math.max(1, Math.ceil(size.w / pixelSize))
  const rows = Math.max(1, Math.ceil(size.h / pixelSize))
  const count = cols * rows

  // Célula = cor + atraso aleatório (em segundos). Refeita quando a contagem ou
  // a rota mudam (re-sorteia o dissolve a cada navegação).
  const cells = React.useMemo(() => {
    const color =
      pathname === "/pacientes"
        ? "var(--mata-100)"
        : pathname === "/profissionais"
          ? "var(--barro-100)"
          : HOME_COLOR

    return Array.from({ length: count }, () => ({
      color,
      delay: Math.random() * spread,
    }))
  }, [count, pathname, spread])

  // Sem stagger sequencial: o ritmo vem do delay aleatório de cada pixel.
  const container: Variants = { hidden: {}, show: {} }

  const pixel: Variants = {
    hidden: (delay: number) => ({
      opacity: 0,
      transition: { duration: 0.1, delay },
    }),
    show: (delay: number) => ({
      opacity: 1,
      transition: { duration: 0.1, delay },
    }),
  }

  return (
    <AnimatePresence onExitComplete={() => (curtainBusy = false)}>
      {active && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[100] grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
          variants={container}
          initial="hidden"
          animate="show"
          exit="hidden"
          // Cobriu por completo → troca o conteúdo escondido → segura `hold` →
          // avisa o reveal e sai.
          onAnimationComplete={(definition) => {
            if (definition !== "show") return
            onCovered?.()
            holdTimer.current = window.setTimeout(() => {
              window.dispatchEvent(new Event(CURTAIN_REVEAL_EVENT))
              setActive(false)
            }, hold * 1000)
          }}
        >
          {cells.map((cell, i) => (
            <motion.div
              key={i}
              custom={cell.delay}
              variants={pixel}
              style={{ backgroundColor: cell.color }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { PixelCurtain }
