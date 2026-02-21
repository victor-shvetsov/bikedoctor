"use server"

import { createClient } from "@/lib/supabase/server"

// ---------------------------------------------------------------------------
// Availability API -- Block B
// Returns which half-day slots (morning / afternoon) are available for a
// given date range, based on mechanic schedules minus existing bookings.
// ---------------------------------------------------------------------------

export interface DaySlots {
  date: string           // "YYYY-MM-DD"
  morning: boolean       // at least 1 mechanic free 08:00-12:00
  afternoon: boolean     // at least 1 mechanic free 12:00-17:00
}

/**
 * Get available half-day slots for a date range (max 30 days).
 * A slot is "available" if at least one active mechanic:
 *   1. Has that dow + slot enabled in mechanic_schedules
 *   2. Does NOT have a booking for that date + slot already
 */
export async function getAvailableSlots(
  dateFrom: string,
  dateTo: string
): Promise<DaySlots[]> {
  const supabase = await createClient()

  // 1. Fetch all active mechanic schedules
  const { data: schedules, error: schedErr } = await supabase
    .from("mechanic_schedules")
    .select("mechanic_id, dow, morning, afternoon, mechanics!inner(is_active)")
    .eq("mechanics.is_active", true)

  if (schedErr) {
    console.error("[v0] Error fetching schedules:", schedErr)
    return []
  }

  // 2. Fetch existing bookings in the date range (non-cancelled)
  const { data: bookings, error: bookErr } = await supabase
    .from("bookings")
    .select("mechanic_id, preferred_date, preferred_time_slot")
    .gte("preferred_date", dateFrom)
    .lte("preferred_date", dateTo)
    .not("status", "eq", "cancelled")
    .not("mechanic_id", "is", null)

  if (bookErr) {
    console.error("[v0] Error fetching bookings:", bookErr)
    return []
  }

  // 3. Index booked slots: "mechanicId:date:slot" -> true
  const bookedSet = new Set<string>()
  for (const b of bookings ?? []) {
    if (b.mechanic_id && b.preferred_date && b.preferred_time_slot) {
      bookedSet.add(`${b.mechanic_id}:${b.preferred_date}:${b.preferred_time_slot}`)
    }
  }

  // 4. Index schedules by dow: Map<dow, { mechanicId, morning, afternoon }[]>
  const schedulesByDow = new Map<number, { mechanicId: string; morning: boolean; afternoon: boolean }[]>()
  for (const s of schedules ?? []) {
    const list = schedulesByDow.get(s.dow) ?? []
    list.push({
      mechanicId: s.mechanic_id,
      morning: s.morning,
      afternoon: s.afternoon,
    })
    schedulesByDow.set(s.dow, list)
  }

  // 5. Walk each date in the range
  const results: DaySlots[] = []
  const start = new Date(dateFrom + "T00:00:00")
  const end = new Date(dateTo + "T00:00:00")
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    // Skip past dates
    if (d < today) continue

    const dateStr = d.toISOString().slice(0, 10)
    // JS getDay(): 0=Sun, 1=Mon...6=Sat. Our DB: 0=Mon...6=Sun
    const jsDay = d.getDay()
    const dow = jsDay === 0 ? 6 : jsDay - 1

    const mechanicsForDay = schedulesByDow.get(dow) ?? []

    let morningAvailable = false
    let afternoonAvailable = false

    for (const mech of mechanicsForDay) {
      // Check morning
      if (mech.morning && !bookedSet.has(`${mech.mechanicId}:${dateStr}:morning`)) {
        morningAvailable = true
      }
      // Check afternoon
      if (mech.afternoon && !bookedSet.has(`${mech.mechanicId}:${dateStr}:afternoon`)) {
        afternoonAvailable = true
      }
      // Early exit if both available
      if (morningAvailable && afternoonAvailable) break
    }

    results.push({
      date: dateStr,
      morning: morningAvailable,
      afternoon: afternoonAvailable,
    })
  }

  return results
}

/**
 * Find the first available mechanic for a specific date + slot.
 * Used during booking creation (auto-assign).
 */
export async function findAvailableMechanic(
  date: string,
  timeSlot: "morning" | "afternoon"
): Promise<string | null> {
  const supabase = await createClient()

  const jsDate = new Date(date + "T00:00:00")
  const jsDay = jsDate.getDay()
  const dow = jsDay === 0 ? 6 : jsDay - 1

  // Get mechanics who work that dow + slot
  const { data: schedules } = await supabase
    .from("mechanic_schedules")
    .select("mechanic_id, morning, afternoon, mechanics!inner(is_active)")
    .eq("dow", dow)
    .eq("mechanics.is_active", true)
    .eq(timeSlot, true)

  if (!schedules?.length) return null

  // Get existing bookings for that date + slot
  const { data: bookings } = await supabase
    .from("bookings")
    .select("mechanic_id")
    .eq("preferred_date", date)
    .eq("preferred_time_slot", timeSlot)
    .not("status", "eq", "cancelled")
    .not("mechanic_id", "is", null)

  const bookedMechanics = new Set((bookings ?? []).map((b) => b.mechanic_id))

  // Return first free mechanic
  for (const s of schedules) {
    if (!bookedMechanics.has(s.mechanic_id)) {
      return s.mechanic_id
    }
  }

  return null
}
