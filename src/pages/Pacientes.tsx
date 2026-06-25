import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import AuthHero from "@/components/sections/AuthHero"

const theme = {
  section: "bg-(--mata-100)",
  border: "border-(--mata-200)!",
  divider: "bg-(--mata-200)!",
  title: "Cadus para\npacientes",
  title_color: "text-(--mata-900)",
  subtitle: "Faça os pré-cadastros para as clínicas-escola.",
  badge: "bg-(--mata-200) text-(--mata-800)",
  badge_label: "PACIENTES",
  dot: "var(--mata-800)",
  register_variant: "default",
  accent_color: "text-(--mata-800)",
  accent_hover: "hover:bg-(--mata-200)! hover:text-(--mata-900)!",
} as const

export default function Pacientes() {
  return (
    <>
      <Header theme={theme} />
      <main>
        <AuthHero theme={theme} />
      </main>
      <Footer theme={theme} />
    </>
  )
}
