import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/">
          {/* logo do Cadus */}
          <span className="font-display font-black text-4xl tracking-tight">
            <span className="text-[var(--mata-600)]">Cadus</span>
            <span className="text-[var(--barro-600)]">.</span>
          </span>
        </Link>

        <div className="flex gap-3 w-72">
          <Button className="flex-1 font-bold bg-[var(--mata-600)] text-[var(--mata-100)] hover:bg-[var(--mata-800)]" asChild>
            <Link to="/pacientes">Sou paciente</Link>
          </Button>
          <Button className="flex-1 font-bold bg-[var(--barro-600)] text-[var(--barro-100)] hover:bg-[var(--barro-800)]" asChild>
            <Link to="/profissionais">Sou profissional</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}