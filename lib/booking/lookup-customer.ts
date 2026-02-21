"use server"

import { createClient } from "@/lib/supabase/server"

/**
 * Look up a customer by 8-digit Danish phone number.
 * Returns prefilled info if found, null if new customer.
 */
export async function lookupCustomerByPhone(phone: string) {
  // Validate: exactly 8 digits
  const clean = phone.replace(/\s/g, "")
  if (!/^\d{8}$/.test(clean)) return null

  const supabase = await createClient()
  const { data } = await supabase
    .from("customers")
    .select("full_name, email, phone, address, zip_code, city")
    .eq("phone", clean)
    .single()

  if (!data) return null

  return {
    name: data.full_name ?? "",
    phone: data.phone ?? "",
    email: data.email ?? "",
    address: data.address ?? "",
    zip: data.zip_code ?? "",
    city: data.city ?? "",
  }
}
