"use client"

import { InternalNav } from "@/components/internal-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Globe,
  Users,
  Package,
  Bell,
  Wrench,
  User,
  Shield,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  CircleDot,
} from "lucide-react"

// ============================================================================
// Non-technical module descriptions -- English primary, Romanian secondary
// Plain language for the BikeDoctor team
// ============================================================================

const SYSTEM_PARTS = [
  {
    icon: Globe,
    title: "Website & Booking",
    titleRo: "Site & Rezervare",
    color: "#F15C45",
    summary: "Your website where customers find you and book a repair.",
    summaryRo: "Site-ul unde clientii va gasesc si rezerva o reparatie.",
    details: [
      "Customer sees your services and prices",
      "Picks bike type and what needs fixing",
      "Fills in contact info and address",
      "Pays by card (Stripe)",
      "Gets a confirmation",
    ],
    detailsRo: [
      "Clientul vede serviciile si preturile",
      "Alege tipul de bicicleta si ce trebuie reparat",
      "Completeaza informatiile de contact si adresa",
      "Plateste cu cardul (Stripe)",
      "Primeste o confirmare",
    ],
    phase: 1,
  },
  {
    icon: Users,
    title: "Customer & Order Management",
    titleRo: "Gestionare Clienti & Comenzi",
    color: "#082852",
    summary: "Everything about your customers and orders in one place.",
    summaryRo: "Totul despre clientii si comenzile voastre intr-un singur loc.",
    details: [
      "All customers with contact info and history",
      "Orders with status from booking to payment",
      "Quotes, invoices and payment overview",
      "Photos and notes on every order",
      "Complete log of everything that happened",
    ],
    detailsRo: [
      "Toti clientii cu informatii de contact si istoric",
      "Comenzi cu status de la rezervare la plata",
      "Oferte, facturi si prezentare generala a platilor",
      "Poze si note la fiecare comanda",
      "Jurnal complet cu tot ce s-a intamplat",
    ],
    phase: 1,
  },
  {
    icon: Package,
    title: "Inventory Management",
    titleRo: "Gestionare Stoc",
    color: "#f08a72",
    summary: "Keep track of spare parts in stock and in the vans.",
    summaryRo: "Tine evidenta pieselor de schimb in stoc si in dube.",
    details: [
      "All parts with prices and stock levels",
      "See what is in each van",
      "Automatic warning when stock is low",
      "Mechanic logs used parts directly",
    ],
    detailsRo: [
      "Toate piesele cu preturi si niveluri de stoc",
      "Vezi ce este in fiecare duba",
      "Avertizare automata cand stocul e scazut",
      "Mecanicul inregistreaza piesele folosite direct",
    ],
    phase: 3,
  },
  {
    icon: Bell,
    title: "Customer Notifications",
    titleRo: "Notificari Clienti",
    color: "#d94535",
    summary: "Automatic SMS and emails to customers at every step.",
    summaryRo: "SMS si email automate catre clienti la fiecare pas.",
    details: [
      "SMS when booking is received",
      "Email with quote for approval",
      "Message when repair is done",
      "Invoice sent automatically",
      "English and Romanian",
    ],
    detailsRo: [
      "SMS cand rezervarea este primita",
      "Email cu oferta pentru aprobare",
      "Mesaj cand reparatia este gata",
      "Factura trimisa automat",
      "Engleza si romana",
    ],
    phase: 2,
  },
  {
    icon: Wrench,
    title: "Mechanic App",
    titleRo: "Aplicatia Mecanic",
    color: "#0c3a6e",
    summary: "Mobile app for mechanics out in the field.",
    summaryRo: "Aplicatie mobila pentru mecanici pe teren.",
    details: [
      "Today's jobs with addresses and tasks",
      "Checklist of what needs to be done",
      "Take photos before and after repair",
      "Log used parts",
      "Write diagnosis and recommendations",
    ],
    detailsRo: [
      "Lucrarile de azi cu adrese si sarcini",
      "Lista de verificare a ce trebuie facut",
      "Fa poze inainte si dupa reparatie",
      "Inregistreaza piesele folosite",
      "Scrie diagnosticul si recomandarile",
    ],
    phase: 2,
  },
  {
    icon: User,
    title: "Customer Portal",
    titleRo: "Portal Clienti",
    color: "#4a6a8a",
    summary: "Customers can track their order and pay online.",
    summaryRo: "Clientii pot urmari comanda si plati online.",
    details: [
      "Login with phone number + SMS code",
      "See status of all orders",
      "Approve or reject quotes",
      "Pay invoices online",
      "See full repair history",
    ],
    detailsRo: [
      "Autentificare cu numar de telefon + cod SMS",
      "Vezi statusul tuturor comenzilor",
      "Aproba sau respinge ofertele",
      "Plateste facturile online",
      "Vezi istoricul complet al reparatiilor",
    ],
    phase: 2,
  },
  {
    icon: Shield,
    title: "Admin & Office",
    titleRo: "Admin & Birou",
    color: "#153d6b",
    summary: "Control panel for the office with full overview.",
    summaryRo: "Panou de control pentru birou cu vedere completa.",
    details: [
      "Dashboard with key numbers",
      "Move orders between stages",
      "Create and edit services and prices",
      "Assign mechanics to zones",
      "User management with roles",
    ],
    detailsRo: [
      "Dashboard cu cifre cheie",
      "Muta comenzile intre etape",
      "Creeaza si editeaza servicii si preturi",
      "Aloca mecanici pe zone",
      "Gestionare utilizatori cu roluri",
    ],
    phase: 2,
  },
  {
    icon: Search,
    title: "SEO & Languages",
    titleRo: "SEO & Limbi",
    color: "#2a7d6d",
    summary: "Get found on Google -- in English and Romanian.",
    summaryRo: "Fii gasit pe Google -- in engleza si romana.",
    details: [
      "Full site in English and Romanian",
      "Optimized for Google search",
      "Local pages: 'bike repair in Copenhagen'",
      "Blog with useful articles",
    ],
    detailsRo: [
      "Site complet in engleza si romana",
      "Optimizat pentru cautare Google",
      "Pagini locale: 'reparatie bicicleta in Copenhaga'",
      "Blog cu articole utile",
    ],
    phase: 4,
  },
  {
    icon: Sparkles,
    title: "AI Content Engine",
    titleRo: "Motor de Continut AI",
    color: "#e04a33",
    summary: "Uses your repair data to create content automatically.",
    summaryRo: "Foloseste datele voastre de reparatii pentru a crea continut automat.",
    details: [
      "Auto-generated local pages per neighborhood",
      "Knowledge pages per bike model",
      "Season articles with real numbers",
      "Service pages with live statistics",
      "You approve everything before it goes live",
    ],
    detailsRo: [
      "Pagini locale auto-generate pe cartier",
      "Pagini de cunostinte pe model de bicicleta",
      "Articole de sezon cu cifre reale",
      "Pagini de servicii cu statistici live",
      "Aprobati totul inainte de publicare",
    ],
    phase: 4,
  },
]

const PHASES_SIMPLE = [
  {
    number: 1,
    title: "Accept Customers",
    titleRo: "Accepta Clienti",
    description: "Website, booking, payment, basic order management.",
    descriptionRo: "Site, rezervare, plata, gestionare comenzi de baza.",
    status: "active" as const,
  },
  {
    number: 2,
    title: "Run the Business",
    titleRo: "Ruleaza Afacerea",
    description: "Customer portal, mechanic app, quotes, invoices, notifications.",
    descriptionRo: "Portal clienti, aplicatie mecanic, oferte, facturi, notificari.",
    status: "upcoming" as const,
  },
  {
    number: 3,
    title: "Scale Without Hiring",
    titleRo: "Scala Fara Angajari",
    description: "Inventory, automatic assignment, advanced admin.",
    descriptionRo: "Stoc, alocare automata, admin avansat.",
    status: "upcoming" as const,
  },
  {
    number: 4,
    title: "Dominate Google",
    titleRo: "Domina Google",
    description: "AI-generated content, local SEO, knowledge base.",
    descriptionRo: "Continut generat de AI, SEO local, baza de cunostinte.",
    status: "upcoming" as const,
  },
]

const DATA_FLOWS = [
  { from: "Website & Booking", to: "Customer & Order Management", label: "Creates customer + order", labelRo: "Creeaza client + comanda" },
  { from: "Customer & Order Management", to: "Mechanic App", label: "Sends jobs to mechanic", labelRo: "Trimite lucrari la mecanic" },
  { from: "Mechanic App", to: "Customer & Order Management", label: "Updates status + notes", labelRo: "Actualizeaza status + note" },
  { from: "Customer & Order Management", to: "Customer Portal", label: "Shows order status", labelRo: "Arata statusul comenzii" },
  { from: "Customer & Order Management", to: "Customer Notifications", label: "Sends automatic messages", labelRo: "Trimite mesaje automate" },
  { from: "Mechanic App", to: "Inventory Management", label: "Logs used parts", labelRo: "Inregistreaza piesele folosite" },
  { from: "Mechanic App", to: "AI Content Engine", label: "Feeds data and photos", labelRo: "Alimenteaza cu date si poze" },
]

import { useState } from "react"

type Lang = "en" | "ro"

export default function OverviewPage() {
  const [lang, setLang] = useState<Lang>("en")

  return (
    <div className="min-h-screen bg-background">
      <InternalNav />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-10 sm:px-6 lg:px-8">
        {/* Title + Language Toggle */}
        <div className="mb-8 sm:mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center rounded-lg border border-border bg-card p-1 gap-1">
              <button
                onClick={() => setLang("en")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  lang === "en"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang("ro")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  lang === "ro"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Romana
              </button>
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl text-balance">
            BikeDoctor Platform
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground text-pretty">
            {lang === "en"
              ? "Your entire digital business in one system. From booking to payment, from mechanic to customer."
              : "Intreaga voastra afacere digitala intr-un singur sistem. De la rezervare la plata, de la mecanic la client."}
          </p>
        </div>

        {/* Phase Timeline */}
        <section className="mb-10 sm:mb-16">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {lang === "en" ? "Build Plan -- 4 Phases" : "Plan de Constructie -- 4 Faze"}
          </h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {PHASES_SIMPLE.map((phase) => (
              <Card
                key={phase.number}
                className={`relative overflow-hidden ${
                  phase.status === "active" ? "ring-2 ring-[#F15C45]/40" : ""
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                        phase.status === "active"
                          ? "bg-[#F15C45] text-white"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {phase.number}
                    </span>
                    <div className="flex items-center gap-2">
                      {phase.status === "active" ? (
                        <CircleDot className="h-3.5 w-3.5 text-[#F15C45]" />
                      ) : (
                        <Clock className="h-3.5 w-3.5 text-muted-foreground/50" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          phase.status === "active" ? "text-[#F15C45]" : "text-muted-foreground"
                        }`}
                      >
                        {phase.status === "active"
                          ? (lang === "en" ? "In progress" : "In curs")
                          : (lang === "en" ? "Coming later" : "Vine mai tarziu")}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {lang === "en" ? phase.title : phase.titleRo}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {lang === "en" ? phase.description : phase.descriptionRo}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* System Parts */}
        <section className="mb-10 sm:mb-16">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {lang === "en" ? "9 Parts of the System" : "Cele 9 Parti ale Sistemului"}
          </h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {SYSTEM_PARTS.map((part) => {
              const Icon = part.icon
              return (
                <Card key={part.title} className="overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${part.color}10` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: part.color }} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground leading-snug">
                          {lang === "en" ? part.title : part.titleRo}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {lang === "en" ? `Phase ${part.phase}` : `Faza ${part.phase}`}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {lang === "en" ? part.summary : part.summaryRo}
                    </p>
                    <ul className="space-y-1.5">
                      {(lang === "en" ? part.details : part.detailsRo).map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2a7d6d]" />
                          <span className="text-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Data Flow -- How they connect */}
        <section className="mb-10 sm:mb-16">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {lang === "en" ? "How It All Connects" : "Cum Se Leaga Totul"}
          </h2>
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="space-y-2 sm:space-y-3">
                {DATA_FLOWS.map((flow, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-secondary/50 px-3 py-2.5 sm:px-4 sm:py-3"
                  >
                    {/* Mobile: stacked layout */}
                    <div className="flex sm:hidden flex-col gap-1">
                      <span className="text-sm font-medium text-foreground">
                        {flow.from}
                      </span>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#F15C45]" />
                        <span className="text-sm font-medium text-foreground">
                          {flow.to}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {lang === "en" ? flow.label : flow.labelRo}
                      </span>
                    </div>
                    {/* Desktop: row layout */}
                    <div className="hidden sm:flex items-center gap-3">
                      <span className="text-sm font-medium text-foreground">
                        {flow.from}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#F15C45]" />
                      <span className="text-sm font-medium text-foreground">
                        {flow.to}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {lang === "en" ? flow.label : flow.labelRo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Overall Progress */}
        <section>
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {lang === "en" ? "Overall Progress" : "Progres General"}
          </h2>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {lang === "en" ? "Phase 1: Accept Customers" : "Faza 1: Accepta Clienti"}
                    </span>
                    <span className="text-sm font-bold text-[#F15C45]">
                      {lang === "en" ? "In progress" : "In curs"}
                    </span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">76</p>
                  <p className="text-xs text-muted-foreground">
                    {lang === "en" ? "Total features" : "Functii in total"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">9</p>
                  <p className="text-xs text-muted-foreground">
                    {lang === "en" ? "System parts" : "Parti ale sistemului"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">4</p>
                  <p className="text-xs text-muted-foreground">
                    {lang === "en" ? "Phases" : "Faze"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
