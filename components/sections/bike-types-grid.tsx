import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import type { BikeType } from "@/lib/types"
import { Wrench } from "lucide-react"

// ---------------------------------------------------------------------------
// Bike Types Section -- matches Figma: two-tone heading left, 2-col wrench
// link list, large photo right. Uses bd-* utilities for consistent spacing.
// ---------------------------------------------------------------------------

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
    <section className="bd-section bg-card">
      <div className="bd-container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: heading + list */}
          <div>
            <h2 className="bd-heading">
              Hvad kan vi{" "}
              <span className="bd-heading-accent">reparere for dig?</span>
            </h2>
            <p className="bd-body mt-4 max-w-md">
              Her er de hovedtyper af koretojer, vi kan reparere. Hvis du ikke
              finder din type her, sa bare rolig! Giv os et opkald, sa finder vi
              gerne ud af, om vi kan hjaelpe med din specifikke sag.
            </p>

            {/* 2-col link list with wrench icons */}
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3">
              {bikeTypes.map((type) => {
                const pageSlug = `${type.slug}-reparation`
                return (
                  <Link
                    key={type.id}
                    href={`/${pageSlug}`}
                    className="group flex items-center gap-2.5 text-base font-medium text-primary transition-colors hover:text-accent"
                  >
                    <Wrench className="size-4 shrink-0 text-accent" />
                    {type.name_da}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right: photo */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/bike-types.jpg"
              alt="Forskellige cykeltyper vi reparerer"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
