"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CalendarCheck, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Overblik", href: "/admin", icon: LayoutDashboard },
  { label: "Bookinger", href: "/admin/bookings", icon: CalendarCheck },
  { label: "Ordrer", href: "/admin/orders", icon: ClipboardList },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-border bg-card lg:block">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 border-b border-border px-5 py-4">
            <Image
              src="/logo.svg"
              alt="BikeDoctor"
              width={120}
              height={32}
              style={{ height: 28, width: "auto" }}
            />
            <span className="text-xs font-medium text-muted-foreground">Admin</span>
          </div>

          <nav className="flex flex-col gap-1 p-3">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
          <Image
            src="/logo.svg"
            alt="BikeDoctor"
            width={100}
            height={28}
            style={{ height: 24, width: "auto" }}
          />
          <span className="text-xs font-medium text-muted-foreground">Admin</span>
          <nav className="ml-auto flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md p-2 transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4" />
                </Link>
              )
            })}
          </nav>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
