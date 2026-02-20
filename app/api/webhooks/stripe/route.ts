import { stripe } from "@/lib/stripe"
import { createAdminClient } from "@/lib/supabase/admin"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import type Stripe from "stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("[v0] Webhook signature verification failed:", message)
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  const supabase = createAdminClient()

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const bookingId = session.metadata?.booking_id
      const customerId = session.metadata?.customer_id

      if (!bookingId) {
        console.error("[v0] Webhook: No booking_id in metadata")
        break
      }

      // Update booking status to paid
      const { error: bookingError } = await supabase
        .from("bookings")
        .update({ status: "confirmed" })
        .eq("id", bookingId)

      if (bookingError) {
        console.error("[v0] Webhook: Failed to update booking:", bookingError)
      }

      // Create payment record
      const { error: paymentError } = await supabase
        .from("payments")
        .insert({
          booking_id: bookingId,
          stripe_payment_intent_id: session.payment_intent as string,
          amount_dkk: (session.amount_total || 0) / 100, // oere -> DKK
          currency: session.currency || "dkk",
          status: "succeeded",
          paid_at: new Date().toISOString(),
        })

      if (paymentError) {
        console.error("[v0] Webhook: Failed to create payment:", paymentError)
      }

      console.log(`[v0] Webhook: Booking ${bookingId} confirmed, payment recorded`)
      break
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session
      const bookingId = session.metadata?.booking_id

      if (bookingId) {
        await supabase
          .from("bookings")
          .update({ status: "expired" })
          .eq("id", bookingId)

        console.log(`[v0] Webhook: Booking ${bookingId} expired`)
      }
      break
    }

    default:
      // Unhandled event type -- silently acknowledge
      break
  }

  return NextResponse.json({ received: true })
}
