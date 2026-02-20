import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { t } from "@/lib/i18n"
import type { Locale } from "@/lib/types"

interface FooterProps {
  locale: Locale
}

export function Footer({ locale }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer id="footer" className="bg-primary px-4 py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Image
              src="/logo.svg"
              alt="BikeDoctor"
              width={140}
              height={36}
              className="brightness-0 invert"
              style={{ height: 36, width: "auto" }}
            />
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
              {t(locale, "footer.tagline")}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">
              Kontakt
            </h4>
            <a
              href="tel:+4512345678"
              className="flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              +45 12 34 56 78
            </a>
            <a
              href="mailto:info@bikedoctor.dk"
              className="flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              <Mail className="h-4 w-4" />
              info@bikedoctor.dk
            </a>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
              <MapPin className="h-4 w-4" />
              Hele Sjælland, Danmark
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6">
          <p className="text-xs text-primary-foreground/40">
            &copy; {year} BikeDoctor. {t(locale, "footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
