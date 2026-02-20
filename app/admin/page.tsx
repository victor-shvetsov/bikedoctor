import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarCheck, ClipboardList, DollarSign } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: bookingCount },
    { count: orderCount },
    { data: recentBookings },
  ] = await Promise.all([
    supabase.from("bookings").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
  ])

  // Calculate total revenue from confirmed bookings
  const { data: paidBookings } = await supabase
    .from("bookings")
    .select("total_dkk")
    .eq("status", "confirmed")

  const totalRevenue = paidBookings?.reduce((sum, b) => sum + (b.total_dkk || 0), 0) || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Overblik</h1>
        <p className="text-sm text-muted-foreground">BikeDoctor admin dashboard</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bookinger
            </CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{bookingCount || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ordrer
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{orderCount || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Omsætning
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              {totalRevenue.toLocaleString("da-DK")} kr
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Seneste bookinger</CardTitle>
          <Link
            href="/admin/bookings"
            className="text-sm font-medium text-accent hover:underline"
          >
            Se alle
          </Link>
        </CardHeader>
        <CardContent>
          {!recentBookings || recentBookings.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Ingen bookinger endnu. Del dit website og vent på den første kunde!
            </p>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((booking: Record<string, unknown>) => (
                <div
                  key={booking.id as string}
                  className="flex items-center justify-between rounded-md border border-border p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {booking.customer_name as string}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.customer_phone as string}
                      {booking.preferred_date
                        ? ` -- ${new Date(booking.preferred_date as string).toLocaleDateString("da-DK")}`
                        : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">
                      {((booking.total_dkk as number) || 0).toLocaleString("da-DK")} kr
                    </p>
                    <span className="inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {booking.status as string}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
