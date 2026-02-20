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

const STATUS_LABELS: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  received: { label: "Modtaget", variant: "outline" },
  diagnosed: { label: "Diagnosticeret", variant: "secondary" },
  quote_sent: { label: "Tilbud sendt", variant: "secondary" },
  approved: { label: "Godkendt", variant: "default" },
  in_progress: { label: "I gang", variant: "default" },
  quality_check: { label: "Kvalitetscheck", variant: "secondary" },
  invoiced: { label: "Faktureret", variant: "secondary" },
  paid: { label: "Betalt", variant: "default" },
  cancelled: { label: "Annulleret", variant: "destructive" },
}

export default async function OrdersPage() {
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      customers(full_name, phone),
      order_line_items(
        id,
        description,
        quantity,
        unit_price_dkk
      )
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Ordrer</h1>
        <p className="text-sm text-muted-foreground">
          Alle ordrer og deres status
        </p>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
          <p className="text-sm text-muted-foreground">
            Ingen ordrer endnu. Ordrer oprettes automatisk fra betalte bookinger.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kunde</TableHead>
                <TableHead>Ydelser</TableHead>
                <TableHead>Planlagt</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order: Record<string, unknown>) => {
                const customer = order.customers as Record<string, unknown> | null
                const lineItems = (order.order_line_items || []) as Array<{
                  id: string
                  description: string
                  quantity: number
                  unit_price_dkk: number
                }>
                const statusConfig =
                  STATUS_LABELS[order.status as string] || STATUS_LABELS.received

                return (
                  <TableRow key={order.id as string}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">
                          {(customer?.full_name as string) || "Ukendt"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(customer?.phone as string) || ""}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        {lineItems.map((item) => (
                          <span
                            key={item.id}
                            className="text-xs text-muted-foreground"
                          >
                            {item.description} x{item.quantity}
                          </span>
                        ))}
                        {lineItems.length === 0 && (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {order.scheduled_date
                        ? new Date(
                            order.scheduled_date as string
                          ).toLocaleDateString("da-DK")
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right text-sm font-semibold text-foreground">
                      {(
                        (order.total_dkk as number) || 0
                      ).toLocaleString("da-DK")}{" "}
                      kr
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusConfig.variant}>
                        {statusConfig.label}
                      </Badge>
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
