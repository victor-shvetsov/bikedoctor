import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Clock, Wrench } from "lucide-react"
import { t } from "@/lib/i18n"
import type { Locale } from "@/lib/types"

interface HeroSectionProps {
  locale: Locale
  onBookingClick: () => void
}

export function HeroSection({ locale, onBookingClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-primary px-4 py-20 lg:px-8 lg:py-28">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            {t(locale, "hero.title")}{" "}
            <span className="text-accent">{t(locale, "hero.titleAccent")}</span>
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
            {t(locale, "hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              onClick={onBookingClick}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-base"
            >
              {t(locale, "hero.cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <a href="#services">
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 text-base"
              >
                {t(locale, "hero.secondaryCta")}
              </Button>
            </a>
          </div>

          {/* Trust pills */}
          <div className="mt-10 flex flex-wrap gap-4">
            {[
              { icon: MapPin, text: t(locale, "trustPill.coverage") },
              { icon: Clock, text: t(locale, "trustPill.hours") },
              { icon: Wrench, text: t(locale, "trustPill.tools") },
            ].map((pill) => (
              <div
                key={pill.text}
                className="flex items-center gap-2 rounded-full border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-2"
              >
                <pill.icon className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-primary-foreground/90">
                  {pill.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
