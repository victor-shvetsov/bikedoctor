// ---------------------------------------------------------------------------
// Booking widget types -- Block C
// ---------------------------------------------------------------------------

/** Service from the catalog, passed as props to the widget */
export interface BookingService {
  id: string
  slug: string
  name_da: string
  price_dkk: number
  duration_minutes: number
  category: string
}

/** Bike type option */
export interface BookingBikeType {
  id: string
  slug: string
  name_da: string
}

/** Customer info collected in step 4 */
export interface BookingCustomerInfo {
  name: string
  phone: string       // 8-digit Danish number (no +45)
  email: string
  address: string
  zip: string
  city: string
}

/** The full multi-step booking state */
export interface BookingState {
  step: 1 | 2 | 3 | 4 | 5
  bikeTypeId: string | null
  bikeTypeName: string | null
  serviceIds: string[]
  date: string | null           // "YYYY-MM-DD"
  timeSlot: "morning" | "afternoon" | null
  customer: BookingCustomerInfo
}

/** Step labels for the progress indicator */
export const STEP_LABELS = [
  "Cykeltype",
  "Ydelser",
  "Dato & tid",
  "Dine oplysninger",
  "Bekræft",
] as const

export const INITIAL_STATE: BookingState = {
  step: 1,
  bikeTypeId: null,
  bikeTypeName: null,
  serviceIds: [],
  date: null,
  timeSlot: null,
  customer: {
    name: "",
    phone: "",
    email: "",
    address: "",
    zip: "",
    city: "",
  },
}
