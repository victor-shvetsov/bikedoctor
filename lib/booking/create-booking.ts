"use server"

import { createClient } from "@/lib/supabase/server"
import { findAvailableMechanic } from "./get-available-slots"
import type { BookingCustomerInfo } from "./types"

export interface CreateBookingInput {
  bikeTypeId: string
  bikeTypeName: string
  serviceIds: string[]
  date: string
  timeSlot: "morning" | "afternoon"
  customer: BookingCustomerInfo
}

export interface CreateBookingResult {
  success: boolean
  bookingId?: string
  error?: string
}

/**
 * Create a booking:
 * 1. Upsert customer by phone
 * 2. Create customer_bike (auto-named)
 * 3. Find available mechanic (auto-assign)
 * 4. Insert booking + booking_line_items
 */
export async function createBooking(input: CreateBookingInput): Promise<CreateBookingResult> {
  const supabase = await createClient()
  const phone = input.customer.phone.replace(/\s/g, "")

  // 1. Upsert customer by phone
  const { data: existingCustomer } = await supabase
    .from("customers")
    .select("id")
    .eq("phone", phone)
    .single()

  let customerId: string

  if (existingCustomer) {
    // Update existing customer info
    customerId = existingCustomer.id
    await supabase
      .from("customers")
      .update({
        full_name: input.customer.name,
        email: input.customer.email,
        address: input.customer.address,
        zip_code: input.customer.zip,
        city: input.customer.city,
      })
      .eq("id", customerId)
  } else {
    // Create new customer with a random 4-digit PIN
    const pin = String(Math.floor(1000 + Math.random() * 9000))
    const { data: newCustomer, error: custErr } = await supabase
      .from("customers")
      .insert({
        full_name: input.customer.name,
        phone,
        email: input.customer.email,
        address: input.customer.address,
        zip_code: input.customer.zip,
        city: input.customer.city,
        pin_code: pin,
      })
      .select("id")
      .single()

    if (custErr || !newCustomer) {
      return { success: false, error: "Kunne ikke oprette kundeprofil." }
    }
    customerId = newCustomer.id
  }

  // 2. Create customer_bike (auto-named: "Ladcykel 1", "Ladcykel 2", etc.)
  const { count } = await supabase
    .from("customer_bikes")
    .select("id", { count: "exact", head: true })
    .eq("customer_id", customerId)
    .eq("bike_type_id", input.bikeTypeId)

  const bikeNumber = (count ?? 0) + 1
  const nickname = `${input.bikeTypeName} ${bikeNumber}`

  const { data: bike, error: bikeErr } = await supabase
    .from("customer_bikes")
    .insert({
      customer_id: customerId,
      bike_type_id: input.bikeTypeId,
      nickname,
    })
    .select("id")
    .single()

  if (bikeErr || !bike) {
    return { success: false, error: "Kunne ikke oprette cykel." }
  }

  // 3. Find available mechanic
  const mechanicId = await findAvailableMechanic(input.date, input.timeSlot)
  if (!mechanicId) {
    return { success: false, error: "Ingen ledige mekanikere på det valgte tidspunkt. Prøv et andet tidspunkt." }
  }

  // 4. Get service prices for line items + total
  const { data: services } = await supabase
    .from("service_catalog")
    .select("id, price_dkk")
    .in("id", input.serviceIds)

  const totalDkk = (services ?? []).reduce((sum, s) => sum + s.price_dkk, 0)

  // 5. Insert booking
  const { data: booking, error: bookErr } = await supabase
    .from("bookings")
    .insert({
      customer_id: customerId,
      bike_type_id: input.bikeTypeId,
      customer_bike_id: bike.id,
      mechanic_id: mechanicId,
      preferred_date: input.date,
      preferred_time_slot: input.timeSlot,
      customer_name: input.customer.name,
      customer_phone: phone,
      customer_email: input.customer.email,
      customer_address: input.customer.address,
      customer_zip: input.customer.zip,
      customer_city: input.customer.city,
      total_dkk: totalDkk,
      status: "pending",
    })
    .select("id")
    .single()

  if (bookErr || !booking) {
    return { success: false, error: "Kunne ikke oprette booking. Prøv igen." }
  }

  // 6. Insert line items
  if (services && services.length > 0) {
    const lineItems = services.map((s) => ({
      booking_id: booking.id,
      service_id: s.id,
      quantity: 1,
      unit_price_dkk: s.price_dkk,
    }))

    await supabase.from("booking_line_items").insert(lineItems)
  }

  return { success: true, bookingId: booking.id }
}
