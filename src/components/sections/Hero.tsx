import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <section 
        className="flex flex-col items-center text-center px-6 py-24">

        {/* Badges */}
        <div className="flex gap-3 mb-6 w-72">
            <Badge className="flex-1 text-sm bg-[var(--mata-200)] text-[var(--mata-800)]">Para pacientes</Badge>
            <Badge className="flex-1 text-sm bg-[var(--barro-200)] text-[var(--barro-800)]">Para profissionais</Badge>
        </div>

        {/* Oneliner */}
        <Typography variant="display-xl" className="max-w-4xl mb-4 text-[var(--areia-800)]">
            Seu cuidado chega antes de você
        </Typography>

        {/* Subtitle */}
        <Typography variant="lead" className="max-w-4xl mb-10 text-[var(--areia-600)]">
            Auto-cadastros para consultas nas clínicas-escola da UFPE:<br />
            menos espera na recepção, mais atenção para quem precisa
        </Typography>

        {/* CTAs */}
        <div className="flex gap-3 w-72">
            <Button className="flex-1 font-bold bg-[var(--mata-600)] text-[var(--mata-100)] hover:bg-[var(--mata-800)]" asChild>
                <Link to="/pacientes">Sou paciente</Link>
            </Button>
            <Button className="flex-1 font-bold bg-[var(--barro-600)] text-[var(--barro-100)] hover:bg-[var(--barro-800)]" asChild>
                <Link to="/profissionais">Sou profissional</Link>
            </Button>
        </div>  

    </section>
  )
}