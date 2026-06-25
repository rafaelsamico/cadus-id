import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Typography } from "@/components/ui/typography"

/** Tema mínimo que o footer usa para tonalizar com a página. */
export interface FooterTheme {
  section: string
  divider: string
}

/**
 * Rodapé. Com `theme`, o fundo (largura cheia) e a linha divisória tonalizam no
 * tom da página.
 */
export default function Footer({ theme }: { theme?: FooterTheme }) {
  return (
    <footer className={cn(theme?.section)}>
      <div className="mx-auto max-w-5xl px-6 py-8">
        <Separator className={cn("mb-8", theme?.divider)} />
        <div className="flex items-center justify-between">
          <Typography variant="caption">
            © {new Date().getFullYear()} Cadus. Todos os direitos reservados.
          </Typography>
        </div>
      </div>
    </footer>
  )
}
