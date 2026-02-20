import { redirect } from "next/navigation"
import { stripe } from "@/lib/stripe"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default async function BookingConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const params = await searchParams
  if (!params.session_id) redirect("/")

  let session
  try {
    session = await stripe.checkout.sessions.retrieve(params.session_id)
  } catch {
    redirect("/")
  }

  const isPaid = session.payment_status === "paid"

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="mb-8 inline-block">
          <Image
            src="/logo.svg"
            alt="BikeDoctor"
            width={140}
            height={36}
            style={{ height: 36, width: "auto" }}
          />
        </Link>

        <div className="mt-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2a7d6d]/10">
            <CheckCircle className="h-8 w-8 text-[#2a7d6d]" />
          </div>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-foreground">
          Tak for din booking!
        </h1>
        <p className="mt-3 text-muted-foreground">
          {isPaid
            ? "Din betaling er modtaget. Vi kontakter dig snarest med bekræftelse af tid og dato."
            : "Vi har modtaget din bestilling og kontakter dig snarest."}
        </p>

        <div className="mt-8">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbage til forsiden
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
