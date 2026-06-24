import { Separator } from "@/components/ui/separator"
import { Typography } from "@/components/ui/typography"

export default function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-6 py-8">
      <Separator className="mb-8" />
      <div className="flex items-center justify-between">
        <Typography variant="caption">
          © {new Date().getFullYear()} Cadus. Todos os direitos reservados.
        </Typography>
      </div>
    </footer>
  )
}