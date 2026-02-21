"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"

interface Testimonial {
  name: string
  location: string
  rating: number
  text: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Maria S.",
    location: "Kobenhavn",
    rating: 5,
    text: "Super hurtig og professionel service. Min cykel blev fikset pa under en time hjemme hos mig!",
  },
  {
    name: "Anders J.",
    location: "Frederiksberg",
    rating: 5,
    text: "Endelig en cykelsmed der kommer til doren. Bestilte om morgenen, fikset om eftermiddagen.",
  },
  {
    name: "Line K.",
    location: "Amager",
    rating: 5,
    text: "Fantastisk oplevelse. Fair priser og mekanikeren var utrolig venlig og kompetent.",
  },
  {
    name: "Thomas P.",
    location: "Norrebro",
    rating: 5,
    text: "Min el-cykel havde brug for service. BikeDoctor fik den til at kore som ny igen.",
  },
  {
    name: "Sofie M.",
    location: "Valby",
    rating: 5,
    text: "Booket online, mekanikeren kom dagen efter. Sa nemt og bekvemt!",
  },
  {
    name: "Kasper R.",
    location: "Hellerup",
    rating: 4,
    text: "Professionelt arbejde med min ladcykel. Kan klart anbefales til travle foraeldre.",
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < count ? "fill-trustpilot text-trustpilot" : "fill-muted text-muted"}`}
        />
      ))}
    </div>
  )
}

export function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationId: number
    const speed = 0.5

    function step() {
      if (!el || isPaused) {
        animationId = requestAnimationFrame(step)
        return
      }
      el.scrollLeft += speed
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0
      }
      animationId = requestAnimationFrame(step)
    }

    animationId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationId)
  }, [isPaused])

  const items = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section className="bg-card py-10 sm:py-12">
      <div className="bd-container">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">
            Hvad vores kunder siger
          </p>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-trustpilot text-trustpilot" />
              ))}
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              4.3 pa Trustpilot
            </span>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        className="mt-5 flex gap-4 overflow-hidden px-5 sm:px-6 lg:px-8"
        role="region"
        aria-label="Kundeanmeldelser"
      >
        {items.map((t, i) => (
          <div
            key={i}
            className="flex w-72 shrink-0 flex-col justify-between rounded-2xl bg-background p-5"
          >
            <div>
              <Stars count={t.rating} />
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                {`\u201c${t.text}\u201d`}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
