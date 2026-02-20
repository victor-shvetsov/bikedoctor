import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import type { BikeType } from "@/lib/types"
import {
  Bike,
  Zap,
  Baby,
  Truck,
  CircleDot,
  Accessibility,
  Bolt,
  HelpCircle,
} from "lucide-react"

// Map bike type slugs to icons
const BIKE_ICONS: Record<string, typeof Bike> = {
  cykel: Bike,
  elcykel: Zap,
  ladcykel: Truck,
  "boerne-cykel": Baby,
  fatbike: CircleDot,
  korestol: Accessibility,
  "el-loebehjul": Bolt,
  andet: HelpCircle,
}

async function getBikeTypes(): Promise<BikeType[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("bike_types")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  return (data as BikeType[]) ?? []
}

export async function BikeTypesGrid() {
  const bikeTypes = await getBikeTypes()

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Vi reparerer alle cykeltyper
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            Fra almindelige cykler til el-cykler og ladcykler
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {bikeTypes.map((type) => {
            const Icon = BIKE_ICONS[type.slug] ?? Bike
            const pageSlug = `${type.slug}-reparation`

            return (
              <Link
                key={type.id}
                href={`/${pageSlug}`}
                className="flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center transition-colors hover:border-accent/40"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/5">
                  <Icon className="size-6 text-primary" />
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">
                  {type.name_da}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
