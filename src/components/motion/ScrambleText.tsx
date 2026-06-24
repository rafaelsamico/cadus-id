import * as React from "react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/** Caracteres usados no embaralhamento quando nenhum é fornecido. */
const DEFAULT_CHARS = "?!@#%&█▓▒░"

/** Cadência da troca de caracteres durante o scramble (~24fps). */
const FRAME_MS = 1000 / 24

/**
 * Tempo mínimo de embaralhamento (fração da duração) garantido a TODA letra,
 * inclusive as centrais. Sem esse piso, as letras do meio resolvem em ~0ms e
 * mal chegam a embaralhar.
 */
const MIN_SCRAMBLE_FRACTION = 0.45

export interface ScrambleTextProps
  extends Omit<React.ComponentProps<"span">, "children"> {
  /** Texto a exibir. */
  text: string
  /** Conjunto de caracteres usados no scramble. */
  chars?: string
  /** Duração total da animação, em ms. */
  duration?: number
}

/**
 * Texto que, ao clicar, embaralha cada letra com caracteres aleatórios antes
 * de resolver para o texto original. O stagger parte do centro para fora: as
 * letras do meio resolvem primeiro e as das extremidades por último. Toda
 * letra embaralha por um tempo mínimo (`MIN_SCRAMBLE_FRACTION`) antes de
 * resolver, então mesmo as centrais têm um efeito visível.
 *
 * Cada letra é um `<span>` independente que troca de caractere em loop via
 * `setInterval`; ao atingir seu tempo de resolução, o interval é limpo e o
 * caractere original é fixado. JS puro, sem libs de animação. As letras são
 * agrupadas por palavra (cada palavra é um `inline-block`), então a linha só
 * quebra entre palavras, nunca no meio de uma.
 *
 * A largura de cada letra é reservada pelo caractere original (renderizado
 * invisível por baixo); o caractere embaralhado é desenhado por cima em
 * posição absoluta. Assim glifos de larguras diferentes (█▓▒░) não causam
 * reflow nem empurram o layout ao redor durante a animação.
 *
 * A tipografia (fonte, tamanho, peso) é herdada do pai via `className` — o
 * componente não define estilo de texto próprio. Respeita
 * `prefers-reduced-motion`: nesse caso exibe o texto estático, sem animar.
 */
function ScrambleText({
  text,
  className,
  chars = DEFAULT_CHARS,
  duration = 800,
  ...props
}: ScrambleTextProps) {
  const reduced = useReducedMotion()
  const [display, setDisplay] = React.useState<string[]>(() => [...text])

  // Agrupa os índices das letras por palavra (espaços viram quebras possíveis).
  // Os espaços nunca embaralham, então suas posições são estáveis e podem ser
  // derivadas só do texto.
  const segments = React.useMemo(() => {
    const result: ({ word: number[] } | { space: true })[] = []
    let current: number[] | null = null

    Array.from(text).forEach((char, i) => {
      if (char.trim() === "") {
        current = null
        result.push({ space: true })
      } else {
        if (!current) {
          current = []
          result.push({ word: current })
        }
        current.push(i)
      }
    })

    return result
  }, [text])

  // Intervals e timeouts ativos, para limpeza em re-trigger / desmontagem.
  const intervals = React.useRef<number[]>([])
  const timeouts = React.useRef<number[]>([])

  const stop = React.useCallback(() => {
    intervals.current.forEach((id) => window.clearInterval(id))
    timeouts.current.forEach((id) => window.clearTimeout(id))
    intervals.current = []
    timeouts.current = []
  }, [])

  // Se o texto mudar, reseta o display e cancela qualquer animação em curso.
  React.useEffect(() => {
    stop()
    setDisplay([...text])
  }, [text, stop])

  // Limpeza ao desmontar.
  React.useEffect(() => stop, [stop])

  const scramble = React.useCallback(() => {
    if (reduced) return

    stop()
    const letters = [...text]
    setDisplay([...letters])

    // Centro do texto: a distância até ele ordena a resolução (centro primeiro,
    // extremidades por último). Toda letra embaralha por pelo menos
    // `minScramble`; a sobra da duração é distribuída pela distância.
    const center = (letters.length - 1) / 2
    const maxDist = center || 1
    const minScramble = duration * MIN_SCRAMBLE_FRACTION
    const spread = duration - minScramble

    letters.forEach((char, i) => {
      // Espaços não embaralham — preservam o ritmo das palavras.
      if (char.trim() === "") return

      const resolveAt = minScramble + (Math.abs(i - center) / maxDist) * spread

      const interval = window.setInterval(() => {
        const random = chars[Math.floor(Math.random() * chars.length)]
        setDisplay((prev) => {
          const next = [...prev]
          next[i] = random
          return next
        })
      }, FRAME_MS)
      intervals.current.push(interval)

      const timeout = window.setTimeout(() => {
        window.clearInterval(interval)
        setDisplay((prev) => {
          const next = [...prev]
          next[i] = char
          return next
        })
      }, resolveAt)
      timeouts.current.push(timeout)
    })
  }, [reduced, stop, text, chars, duration])

  return (
    <span
      className={cn("cursor-pointer", className)}
      onClick={scramble}
      aria-label={text}
      {...props}
    >
      {segments.map((seg, si) =>
        "space" in seg ? (
          <React.Fragment key={si}> </React.Fragment>
        ) : (
          // Palavra indivisível: inline-block impede a quebra no meio dela.
          <span key={si} className="inline-block" aria-hidden>
            {seg.word.map((i) => (
              // A letra original (invisível) reserva a largura; o caractere
              // embaralhado é desenhado por cima, então glifos de larguras
              // diferentes não causam reflow nem empurram o layout.
              <span key={i} className="relative inline-block text-center">
                <span className="invisible">{text[i]}</span>
                <span className="absolute inset-0">{display[i]}</span>
              </span>
            ))}
          </span>
        )
      )}
    </span>
  )
}

export { ScrambleText }
