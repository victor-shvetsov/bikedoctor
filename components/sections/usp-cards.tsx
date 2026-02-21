import { Truck, Leaf, Wrench } from "lucide-react"

// ---------------------------------------------------------------------------
// USP Cards -- 3 white cards that overlap the hero bottom edge (Figma).
// Uses negative margin-top to pull up into the hero section.
// Each card: coral line-art icon, navy bold heading, muted body text.
// ---------------------------------------------------------------------------

const USP_ITEMS = [
  {
    icon: Truck,
    title: "Vi kommer til dig!",
    body: "Ingen grund til at transportere din cykel til et vaerksted! Vores mobile cykelvaerksted tilbyder service lige hvor du er -- hjemme, pa arbejde eller et andet sted efter dit valg.",
  },
  {
    icon: Leaf,
    title: "Baeredygtighed i fokus",
    body: "Vi hjaelper med at holde din cykel i perfekt stand, hvilket mindsker CO2-udslippet ved at gore cyklen til et attraktivt alternativ til bilen.",
  },
  {
    icon: Wrench,
    title: "Kvalitetsservice fra erfarne cykelfolk",
    body: "Med mange ars erfaring i cykelreparationer har vi opbygget ekspertise i et bredt udvalg af cykelmodeller, herunder maerker som SCO, Mustang, Specialized, Babboe osv.",
  },
]

export function UspCards() {
  return (
    <section className="relative z-10 -mt-20 pb-8 sm:-mt-24 lg:-mt-28">
      <div className="bd-container">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {USP_ITEMS.map((item) => (
            <div key={item.title} className="bd-card">
              <div className="bd-icon mb-5">
                <item.icon className="size-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-foreground sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
