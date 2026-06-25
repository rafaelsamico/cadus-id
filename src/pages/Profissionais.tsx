import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import AuthHero from "@/components/sections/AuthHero"

// Tema da página (barro). Compartilhado entre header, hero e footer.
const theme = {
  section: "bg-(--barro-100)",
  border: "border-(--barro-200)!",
  divider: "bg-(--barro-200)!",
  title: "Cadus para\nprofissionais",
  title_color: "text-(--barro-900)",
  subtitle: "Gerencie os pré-cadastros da sua clínica-escola.",
  badge: "bg-(--barro-200) text-(--barro-800)",
  badge_label: "PROFISSIONAIS",
  dot: "var(--barro-800)",
  register_variant: "secondary",
  accent_color: "text-(--barro-800)",
  accent_hover: "hover:bg-(--barro-200)! hover:text-(--barro-900)!",
} as const

export default function Profissionais() {
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
