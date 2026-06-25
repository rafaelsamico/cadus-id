import { Heart, Stethoscope } from "lucide-react"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { AnimatedButton } from "@/components/motion/AnimatedButton"

/** Tema mínimo que o header usa para tonalizar com a página. */
export interface HeaderTheme {
  section: string
  border: string
}

/**
 * Cabeçalho fixo. Os CTAs são sempre os dois acessos por público. Com `theme`,
 * o fundo e a borda inferior tonalizam no tom da página.
 */
export default function Header({ theme }: { theme?: HeaderTheme }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b",
        theme ? cn(theme.section, theme.border) : "border-border bg-background"
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo do Cadus */}
        <Link to="/">
          <span className="font-display font-black text-4xl tracking-tight">
            <span className="text-(--mata-600)">Cadus</span>
            <span className="text-(--barro-600)">.</span>
          </span>
        </Link>

        {/* CTAs */}
        <div className="inline-grid grid-cols-2 gap-3">
          <AnimatedButton icon={Heart} variant="default" className="w-full" asChild>
            <Link to="/pacientes">Sou paciente</Link>
          </AnimatedButton>
          <AnimatedButton
            icon={Stethoscope}
            variant="secondary"
            className="w-full"
            asChild
          >
            <Link to="/profissionais">Sou profissional</Link>
          </AnimatedButton>
        </div>
      </div>
    </header>
  )
}
