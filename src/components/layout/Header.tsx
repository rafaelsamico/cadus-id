import { User, Stethoscope } from "lucide-react"

import { AnimatedButton } from "@/components/motion/AnimatedButton"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo do Cadus */}
        <Link to="/">
          <span className="font-display font-black text-4xl tracking-tight">
            <span className="text-(--mata-600)">Cadus</span>
            <span className="text-(--barro-600)">.</span>
          </span>
        </Link>

        {/* CTAs */}
        <div className="flex gap-3 w-72">
          <AnimatedButton icon={User} variant={"default"} className="flex-1" asChild>
            <Link to="/pacientes">Sou paciente</Link>
          </AnimatedButton>
          <AnimatedButton icon={Stethoscope} variant={"secondary"} className="flex-1" asChild>
            <Link to="/profissionais">Sou profissional</Link>
          </AnimatedButton>
        </div>
      </div>
    </header>
  )
}