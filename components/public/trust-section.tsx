import { Card, CardContent } from "@/components/ui/card"
import {
  Zap,
  Clock,
  UserCheck,
  Gem,
  Wrench,
  ShieldCheck,
} from "lucide-react"
import { t } from "@/lib/i18n"
import type { Locale } from "@/lib/types"

interface TrustSectionProps {
  locale: Locale
}

const TRUST_ITEMS = [
  { icon: Zap, titleKey: "trust.efficiency", descKey: "trust.efficiencyDesc" },
  { icon: Clock, titleKey: "trust.flexibility", descKey: "trust.flexibilityDesc" },
  { icon: UserCheck, titleKey: "trust.competence", descKey: "trust.competenceDesc" },
  { icon: Gem, titleKey: "trust.quality", descKey: "trust.qualityDesc" },
  { icon: Wrench, titleKey: "trust.tools", descKey: "trust.toolsDesc" },
  { icon: ShieldCheck, titleKey: "trust.guarantee", descKey: "trust.guaranteeDesc" },
] as const

export function TrustSection({ locale }: TrustSectionProps) {
  return (
    <section id="trust" className="bg-secondary/50 px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t(locale, "trust.title")}{" "}
            <span className="text-accent">{t(locale, "trust.titleAccent")}</span>
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            {t(locale, "trust.subtitle")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_ITEMS.map((item) => (
            <Card
              key={item.titleKey}
              className="border-border transition-shadow hover:shadow-md"
            >
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <item.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {t(locale, item.titleKey as any)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(locale, item.descKey as any)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
