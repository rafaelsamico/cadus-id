import { UserPlus, LogIn } from "lucide-react"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Typography } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "@/components/motion/AnimatedButton"
import { ScrambleText } from "@/components/motion/ScrambleText"
import { PulsingDot } from "@/components/motion/PulsingDot"

export interface AuthHeroTheme {
  /** Fundo tonalizado da seção. */
  section: string
  /** Título (use "\n" para forçar quebra de linha). */
  title: string
  /** Cor do título. */
  title_color: string
  /** Texto do subtítulo. */
  subtitle: string
  /** Classe de cor do badge (fundo + texto). */
  badge: string
  /** Rótulo do badge. */
  badge_label: string
  /** Cor do PulsingDot. */
  dot: string
  /** Variante do botão primário "Registrar". */
  register_variant: "default" | "secondary"
  /** Cor do texto do CTA "Entrar". */
  accent_color: string
  /** Hover tonalizado do CTA "Entrar". */
  accent_hover: string
}

/**
 * Seção de entrada das páginas de público. Recebe todo o tema por prop (a
 * página é dona do conteúdo): fundo tonalizado, badge, oneliner em duas linhas
 * (com scramble na entrada), subtítulo e dois CTAs lado a lado — "Registrar"
 * (primário) e "Entrar" (`ghost`, hover tonalizado).
 */
export default function AuthHero({ theme }: { theme: AuthHeroTheme }) {
  return (
    <section
      className={cn(
        "flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center px-6 py-16 text-center",
        theme.section
      )}
    >
      {/* Badge do público */}
      <Badge className={cn("mb-6 gap-1.5 text-sm", theme.badge)}>
        <PulsingDot color={theme.dot} />
        {theme.badge_label}
      </Badge>

      {/* Oneliner */}
      <Typography
        variant="display-xl"
        className={cn("mb-4 max-w-4xl", theme.title_color)}
      >
        <ScrambleText text={theme.title} autoPlay />
      </Typography>

      {/* Subtitle */}
      <Typography variant="lead" className="mb-4 max-w-xl text-pretty">
        {theme.subtitle}
      </Typography>

      {/* CTAs lado a lado, mesmo tamanho: Registrar sólido, Entrar ghost */}
      <div className="flex items-center justify-center gap-3">
        <AnimatedButton
          icon={UserPlus}
          variant={theme.register_variant}
          size="lg"
          asChild
        >
          <Link to="#">Registrar</Link>
        </AnimatedButton>
        <AnimatedButton
          icon={LogIn}
          variant="ghost"
          size="lg"
          className={cn(theme.accent_color, theme.accent_hover)}
          asChild
        >
          <Link to="#">Entrar</Link>
        </AnimatedButton>
      </div>
    </section>
  )
}
