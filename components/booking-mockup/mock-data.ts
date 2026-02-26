// Mock data for the booking form mockup
// All prices in DKK, all copy in Danish

export type BikeTypeOption = {
  slug: string
  label: string
  icon: string
}

export const BIKE_TYPES: BikeTypeOption[] = [
  { slug: "alm-cykel", label: "Alm. cykel", icon: "bike" },
  { slug: "elcykel", label: "Elcykel", icon: "zap" },
  { slug: "ladcykel", label: "Ladcykel", icon: "truck" },
  { slug: "fatbike", label: "Fatbike", icon: "mountain" },
  { slug: "bornecykel", label: "B\u00f8rnecykel", icon: "baby" },
  { slug: "korestol", label: "K\u00f8restol", icon: "accessibility" },
  { slug: "el-scooter", label: "El-Scooter", icon: "gauge" },
  { slug: "andet", label: "Andet", icon: "help-circle" },
]

export type TubeOption = {
  id: string
  label: string
  price: number
}

// Tube/tyre options vary by bike type
export function getTubeOptions(bikeSlug: string): TubeOption[] {
  const isCargoOrElcykel = bikeSlug === "ladcykel" || bikeSlug === "elcykel"
  const base: TubeOption[] = [
    { id: "1-tube", label: "1 slange", price: 299 },
    { id: "2-tubes", label: "2 slanger", price: 599 },
    { id: "1-tyre-1-tube", label: "1 d\u00e6k + 1 slange", price: 649 },
    { id: "2-tyres-2-tubes", label: "2 d\u00e6k + 2 slanger", price: 1099 },
  ]
  if (isCargoOrElcykel) {
    base.push({ id: "3-tyres-3-tubes", label: "3 d\u00e6k + 3 slanger", price: 1549 })
  }
  return base
}

export type ServiceCardType = "flat-tyre" | "troubleshoot" | "maintenance" | "serviceaftale"

export interface MainServiceCard {
  id: ServiceCardType
  title: string
  subtitle: string
  price: number | null // null = varies
}

export const MAIN_SERVICES: MainServiceCard[] = [
  {
    id: "flat-tyre",
    title: "Punkteret d\u00e6k",
    subtitle: "Vi kommer og skifter dit d\u00e6k/slange",
    price: null,
  },
  {
    id: "troubleshoot",
    title: "Noget er i stykker",
    subtitle: "Fejlfinding og reparation",
    price: 499,
  },
  {
    id: "maintenance",
    title: "Service eftersyn",
    subtitle: "F\u00e5 din cykel tjekket og justeret",
    price: null,
  },
  {
    id: "serviceaftale",
    title: "Serviceaftale",
    subtitle: "Fast aftale med din cykelsmed",
    price: null,
  },
]

export type MaintenanceOption = {
  id: string
  title: string
  price: number
  description: string
}

export const MAINTENANCE_OPTIONS: MaintenanceOption[] = [
  {
    id: "regular",
    title: "Regelm\u00e6ssig serviceeftersyn",
    price: 499,
    description:
      "Komplet gennemgang af gear, bremser, d\u00e6ktryk, kædesm\u00f8ring og justeringer. Perfekt til at holde cyklen k\u00f8reklar.",
  },
  {
    id: "master",
    title: "Master Service",
    price: 2999,
    description:
      "Den ultimative service: komplet adskillelse, reng\u00f8ring, afkalkning af alle dele, nye bremseklodser, ny k\u00e6de, nye kabler, gear- og bremsejustering, hjulretning, lejeeftersyn og sm\u00f8ring af alle bev\u00e6gelige dele. Din cykel bliver som ny. Inkluderer reservedele op til 500 kr. Evt. yderligere dele faktureres separat efter aftale.",
  },
]

export function getServiceaftalePriceYearly(bikeSlug: string): number {
  const priceMap: Record<string, number> = {
    "alm-cykel": 3600,
    "elcykel": 4500,
    "ladcykel": 5400,
    "fatbike": 3600,
    "bornecykel": 2400,
    "korestol": 3600,
    "el-scooter": 3600,
    "andet": 3600,
  }
  return priceMap[bikeSlug] ?? 3600
}

// Dynamic placeholders based on bike type
export function getTroubleshootPlaceholder(bikeSlug: string): string {
  const placeholders: Record<string, string> = {
    "alm-cykel":
      "F.eks: Bremserne hv\u00e6ser, og baghjulet drejer ikke frit. Lav venligst et komplet tjek og giv et tilbud p\u00e5 reparation.",
    "elcykel":
      "F.eks: Motoren st\u00f8jer ved bakkestart, og displayet blinker. Se venligst p\u00e5 det elektriske system og giv et tilbud.",
    "ladcykel":
      "F.eks: Ladcyklens gear hopper, og b\u00f8rneboks-l\u00e5sen klemmer. Giv venligst et tilbud p\u00e5 reparation.",
    "fatbike":
      "F.eks: Forbremserne tr\u00e6kker til den ene side, og d\u00e6kkene mister luft hurtigt. Tjek venligst og giv et tilbud.",
    "bornecykel":
      "F.eks: Kæden hopper af, og st\u00f8ttehjulene sidder sk\u00e6vt. Tjek venligst og giv et tilbud.",
    "korestol":
      "F.eks: Det ene hjul l\u00e5ser, og bremseh\u00e5ndtaget er l\u00f8st. Tjek venligst og giv et tilbud.",
    "el-scooter":
      "F.eks: Scooteren accelererer ujævnt, og bagbremsen er slidt. Tjek venligst og giv et tilbud.",
    "andet":
      "Beskriv venligst problemet s\u00e5 detaljeret som muligt, s\u00e5 kan vores mekaniker give et tilbud.",
  }
  return placeholders[bikeSlug] ?? placeholders["andet"]
}

export function getMessagePlaceholder(bikeSlug: string): string {
  const placeholders: Record<string, string> = {
    "alm-cykel": "F.eks: Cyklen st\u00e5r i g\u00e5rden, d\u00f8ren er \u00e5ben. Ring n\u00e5r du er fremme.",
    "elcykel": "F.eks: Elcyklen st\u00e5r i carporten. Oplader h\u00e6nger p\u00e5 væggen. Ring f\u00f8rst.",
    "ladcykel":
      "F.eks: Ladcyklen st\u00e5r foran huset. Den er tung, s\u00e5 den skal fikses p\u00e5 stedet.",
    "fatbike": "F.eks: Cyklen st\u00e5r i skuret bag huset. Porten er \u00e5ben.",
    "bornecykel": "F.eks: B\u00f8rnecyklen st\u00e5r ved hovedd\u00f8ren. Vi er hjemme hele dagen.",
    "korestol": "F.eks: Ring p\u00e5 d\u00f8ren n\u00e5r du ankommer. K\u00f8restolen er inden d\u00f8re.",
    "el-scooter": "F.eks: Scooteren st\u00e5r p\u00e5 altanen i stuen. Ring f\u00f8rst.",
    "andet": "F.eks: Beskriv hvor din cykel/k\u00f8ret\u00f8j st\u00e5r, og hvorn\u00e5r vi kan komme.",
  }
  return placeholders[bikeSlug] ?? placeholders["andet"]
}

export function getMaintenancePlaceholder(bikeSlug: string): string {
  const placeholders: Record<string, string> = {
    "alm-cykel": "F.eks: Cyklen har ikke v\u00e6ret til service i 2 \u00e5r. Gearene er lidt tr\u00e6ge.",
    "elcykel": "F.eks: Batteriet holder ikke s\u00e5 l\u00e6nge som f\u00f8r. Se gerne ogs\u00e5 p\u00e5 det.",
    "ladcykel":
      "F.eks: Vi k\u00f8rer hver dag med b\u00f8rnene. Alt f\u00f8les lidt slidt og l\u00f8st.",
    "fatbike": "F.eks: Cyklen har st\u00e5et stille hele vinteren. Tr\u00e6nger til en gennemgang.",
    "bornecykel": "F.eks: B\u00f8rnecyklen skal klarg\u00f8res til s\u00e6sonen.",
    "korestol": "F.eks: Hjulene tr\u00e6nger til et eftersyn. Bremserne f\u00f8les bl\u00f8de.",
    "el-scooter": "F.eks: Bremserne hv\u00e6ser og forhjulet vibrerer lidt.",
    "andet": "Fort\u00e6l os lidt om hvad der skal ses p\u00e5.",
  }
  return placeholders[bikeSlug] ?? placeholders["andet"]
}
