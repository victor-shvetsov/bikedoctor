import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"

const STATUS_LABELS: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "Afventer", variant: "outline" },
  confirmed: { label: "Bekræftet", variant: "default" },
  cancelled: { label: "Annulleret", variant: "destructive" },
}

export default async function BookingsPage() {
  const supabase = await createClient()

  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      *,
      bike_types(name_da),
      booking_line_items(
        id,
        quantity,
        unit_price_dkk,
        service_catalog(name_da)
      )
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Bookinger</h1>
        <p className="text-sm text-muted-foreground">
          Alle indkomne bookinger fra websitet
        </p>
      </div>

      {!bookings || bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
          <p className="text-sm text-muted-foreground">
            Ingen bookinger endnu
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kunde</TableHead>
                <TableHead>Cykeltype</TableHead>
                <TableHead>Ydelser</TableHead>
                <TableHead>Dato</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking: Record<string, unknown>) => {
                const bikeType = booking.bike_types as Record<string, unknown> | null
                const lineItems = (booking.booking_line_items || []) as Array<{
                  id: string
                  quantity: number
                  unit_price_dkk: number
                  service_catalog: { name_da: string } | null
                }>
                const statusConfig = STATUS_LABELS[booking.status as string] || STATUS_LABELS.pending

                return (
                  <TableRow key={booking.id as string}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">
                          {booking.customer_name as string}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.customer_phone as string}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {bikeType?.name_da as string || "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        {lineItems.map((item) => (
                          <span key={item.id} className="text-xs text-muted-foreground">
                            {item.service_catalog?.name_da || "Ukendt"} x{item.quantity}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {booking.preferred_date
                        ? new Date(booking.preferred_date as string).toLocaleDateString("da-DK")
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right text-sm font-semibold text-foreground">
                      {((booking.total_dkk as number) || 0).toLocaleString("da-DK")} kr
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
