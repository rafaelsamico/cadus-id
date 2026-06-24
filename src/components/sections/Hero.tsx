import { User, Stethoscope } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "@/components/motion/AnimatedButton"
import { Marquee } from "@/components/motion/Marquee"
import { Typography } from "@/components/ui/typography"
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <section 
        className="flex flex-col items-center text-center px-6 py-20">

        {/* Badges */}
        <div className="flex gap-3 mb-6 w-72">
            <Badge className="flex-1 text-sm bg-(--mata-200) text-(--mata-800)">PACIENTES</Badge>
            <Badge className="flex-1 text-sm bg-(--barro-200) text-(--barro-800)">PROFISSIONAIS</Badge>
        </div>

        {/* Oneliner */}
        <Typography variant="display-xl" className="max-w-4xl mb-4 text-(--areia-800)">
            Seu cuidado chega antes de você
        </Typography>

        {/* Subtitle */}
        <Typography variant="lead" className="max-w-4xl mb-10 text-(--areia-600)">
            Auto-cadastros para consultas nas clínicas-escola da UFPE:<br />
            menos espera na recepção, mais atenção para quem precisa
        </Typography>

        {/* Clínicas em loop */}
        <Marquee
            className="mt-16 w-full max-w-3xl"
            items={[
                "Clínica Digital",
                "Odontologia",
                "Fonoaudiologia",
                "Psicologia",
                "Fisioterapia",
                "Nutrição",
                "Terapia Ocupacional",
            ]}
        />

        {/* CTAs */}
        <div className="flex gap-3 w-72">
            <AnimatedButton icon={User} variant={"default"} className="flex-1" asChild>
                <Link to="/pacientes">Sou paciente</Link>
            </AnimatedButton>
            <AnimatedButton icon={Stethoscope} variant={"secondary"} className="flex-1" asChild>
                <Link to="/profissionais">Sou profissional</Link>
            </AnimatedButton>
        </div>

    </section>
  )
}