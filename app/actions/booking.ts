"use server"

import { stripe } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"

interface CreateBookingInput {
  bikeTypeId: string
  services: Array<{ serviceId: string; quantity: number; unitPriceDkk: number; name: string }>
  customer: {
    name: string
    phone: string
    email: string
    address: string
    zip: string
    city: string
    preferredDate: string
    preferredTimeSlot: string
    notes: string
  }
  totalDkk: number
}

export async function createBookingAndCheckout(input: CreateBookingInput) {
  const supabase = await createClient()

  // 0. Server-side price validation -- NEVER trust client-sent prices
  const serviceIds = input.services.map((s) => s.serviceId)
  const { data: dbServices, error: svcError } = await supabase
    .from("service_catalog")
    .select("id, price_dkk, name_da")
    .in("id", serviceIds)

  if (svcError || !dbServices || dbServices.length === 0) {
    console.error("[v0] Service lookup error:", svcError)
    return { error: "Failed to validate services" }
  }

  const priceMap = new Map(dbServices.map((s) => [s.id, s]))

  // Rebuild line items with DB prices, ignore client-sent prices
  const validatedServices = input.services.map((s) => {
    const dbSvc = priceMap.get(s.serviceId)
    if (!dbSvc) throw new Error(`Service ${s.serviceId} not found`)
    return {
      ...s,
      unitPriceDkk: dbSvc.price_dkk,
      name: dbSvc.name_da,
    }
  })

  const validatedTotal = validatedServices.reduce(
    (sum, s) => sum + s.unitPriceDkk * s.quantity,
    0
  )

  // 1. Upsert customer
  const { data: customer, error: custError } = await supabase
    .from("customers")
    .insert({
      full_name: input.customer.name,
      phone: input.customer.phone,
      email: input.customer.email || null,
      address: input.customer.address,
      zip_code: input.customer.zip,
      city: input.customer.city,
    })
    .select("id")
    .single()

  if (custError) {
    console.error("[v0] Customer insert error:", custError)
    return { error: "Failed to create customer" }
  }

  // 2. Create booking
  const { data: booking, error: bookError } = await supabase
    .from("bookings")
    .insert({
      customer_id: customer.id,
      bike_type_id: input.bikeTypeId,
      status: "pending",
      preferred_date: input.customer.preferredDate || null,
      preferred_time_slot: input.customer.preferredTimeSlot || null,
      customer_name: input.customer.name,
      customer_phone: input.customer.phone,
      customer_email: input.customer.email || null,
      customer_address: input.customer.address,
      customer_zip: input.customer.zip,
      customer_city: input.customer.city,
      total_dkk: validatedTotal,
      notes: input.customer.notes || null,
    })
    .select("id")
    .single()

  if (bookError) {
    console.error("[v0] Booking insert error:", bookError)
    return { error: "Failed to create booking" }
  }

  // 3. Insert line items
  const lineItems = validatedServices.map((s) => ({
    booking_id: booking.id,
    service_id: s.serviceId,
    quantity: s.quantity,
    unit_price_dkk: s.unitPriceDkk,
  }))

  const { error: liError } = await supabase
    .from("booking_line_items")
    .insert(lineItems)

  if (liError) {
    console.error("[v0] Line items insert error:", liError)
  }

  // 4. Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    currency: "dkk",
    // Convert DKK to oere (smallest unit)
    line_items: validatedServices.map((s) => ({
      price_data: {
        currency: "dkk",
        product_data: {
          name: s.name,
        },
        unit_amount: s.unitPriceDkk * 100, // DKK -> oere
      },
      quantity: s.quantity,
    })),
    customer_email: input.customer.email || undefined,
    metadata: {
      booking_id: booking.id,
      customer_id: customer.id,
    },
    ui_mode: "embedded",
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
  })

  // 5. Update booking with Stripe session ID
  await supabase
    .from("bookings")
    .update({ stripe_session_id: session.id })
    .eq("id", booking.id)

  return { clientSecret: session.client_secret, bookingId: booking.id }
}

export async function getBookingStatus(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  return { status: session.status, paymentStatus: session.payment_status }
}
