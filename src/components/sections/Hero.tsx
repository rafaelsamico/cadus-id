import { Heart, Stethoscope } from "lucide-react"

import { Link } from "react-router-dom"
import { Typography } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "@/components/motion/AnimatedButton"
import { Marquee } from "@/components/motion/Marquee"
import { PulsingDot } from "@/components/motion/PulsingDot"
import { ScrambleText } from "@/components/motion/ScrambleText"

export default function Hero() {
  return (
    <section className="flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center px-6 py-16 text-center">

        {/* Badges */}
        <div className="mb-6 inline-grid grid-cols-2 gap-3">
            <Badge className="w-full justify-center gap-1.5 text-sm bg-(--mata-200) text-(--mata-800)"><PulsingDot color="var(--mata-800)" />PACIENTES</Badge>
            <Badge className="w-full justify-center gap-1.5 text-sm bg-(--barro-200) text-(--barro-800)"><PulsingDot color="var(--barro-800)" />PROFISSIONAIS</Badge>
        </div>

        {/* Oneliner */}
        <Typography variant="display-xl" className="mb-4 max-w-4xl text-(--areia-800)">
            <ScrambleText text="Seu cuidado chega antes de você" autoPlay />
        </Typography>

        {/* Subtitle */}
        <Typography variant="lead" className="max-w-xl text-pretty">
            Auto-cadastros para consultas nas clínicas-escola da UFPE:
            menos espera na recepção, mais atenção para quem precisa
        </Typography>

        {/* Clínicas em loop */}
        <Marquee
            className="my-8 w-full max-w-3xl"
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
        <div className="inline-grid grid-cols-2 gap-3">
            <AnimatedButton icon={Heart} variant={"default"} className="w-full" asChild>
                <Link to="/pacientes">Sou paciente</Link>
            </AnimatedButton>
            <AnimatedButton icon={Stethoscope} variant={"secondary"} className="w-full" asChild>
                <Link to="/profissionais">Sou profissional</Link>
            </AnimatedButton>
        </div>

    </section>
  )
}
