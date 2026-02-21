import { createStaticClient } from "@/lib/supabase/static"
import { BookingWidget } from "@/components/booking/booking-widget"
import type { BookingBikeType, BookingService } from "@/lib/booking/types"

export default async function BookPage() {
  const supabase = createStaticClient()

  // Fetch bike types + services in parallel
  const [bikeTypesRes, servicesRes] = await Promise.all([
    supabase
      .from("bike_types")
      .select("id, slug, name_da")
      .eq("is_active", true)
      .order("sort_order"),
    supabase
      .from("service_catalog")
      .select("id, slug, name_da, price_dkk, duration_minutes, category")
      .eq("is_active", true)
      .order("sort_order"),
  ])

  const bikeTypes: BookingBikeType[] = (bikeTypesRes.data ?? []).map((bt) => ({
    id: bt.id,
    slug: bt.slug,
    name_da: bt.name_da,
  }))

  const services: BookingService[] = (servicesRes.data ?? []).map((s) => ({
    id: s.id,
    slug: s.slug,
    name_da: s.name_da,
    price_dkk: s.price_dkk,
    duration_minutes: s.duration_minutes,
    category: s.category,
  }))

  return <BookingWidget bikeTypes={bikeTypes} services={services} />
}
