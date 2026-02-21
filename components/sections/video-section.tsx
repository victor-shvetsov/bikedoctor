import { Play } from "lucide-react"

export function VideoSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {"Se hvordan det fungerer"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            {"F\u00f8lg med n\u00e5r vores cykelsmed kommer ud til en kunde og f\u00e5r cyklen k\u00f8reklar p\u00e5 stedet."}
          </p>
        </div>

        {/* Video placeholder -- replace with real embed when promo video is ready */}
        <div className="group relative mt-10 overflow-hidden rounded-2xl bg-primary/[0.04]">
          <div className="aspect-video w-full">
            {/* Placeholder visual */}
            <div className="flex size-full flex-col items-center justify-center gap-4 bg-primary/[0.04]">
              <div className="flex size-20 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/20 transition-transform group-hover:scale-105">
                <Play className="ml-1 size-8 text-accent-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {"Video kommer snart"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
