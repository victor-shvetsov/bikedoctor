import { Star, Bike, Clock, ShieldCheck } from "lucide-react"

const TRUST_ITEMS = [
  { icon: Star, value: "4.3/5", label: "Trustpilot" },
  { icon: Bike, value: "2.500+", label: "Cykler repareret" },
  { icon: Clock, value: "Samme dag", label: "Hurtig responstid" },
  { icon: ShieldCheck, value: "Garanti", label: "Pa alt arbejde" },
]

export function TrustBar() {
  return (
    <section className="bg-card py-5 shadow-sm">
      <div className="bd-container">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="bd-icon !size-10">
                <item.icon className="size-5" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight text-foreground">
                  {item.value}
                </p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
