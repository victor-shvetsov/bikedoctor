import { Star, Bike, Clock, ShieldCheck } from "lucide-react"

const TRUST_ITEMS = [
  {
    icon: Star,
    value: "4.9/5",
    label: "Kundetilfredshed",
  },
  {
    icon: Bike,
    value: "2.500+",
    label: "Cykler repareret",
  },
  {
    icon: Clock,
    value: "Samme dag",
    label: "Hurtig responstid",
  },
  {
    icon: ShieldCheck,
    value: "Garanti",
    label: "P\u00e5 alt arbejde",
  },
]

export function TrustBar() {
  return (
    <section className="border-b border-border bg-card py-6">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:justify-between">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <item.icon className="size-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
