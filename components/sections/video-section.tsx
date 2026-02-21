import { Play } from "lucide-react"

export function VideoSection() {
  return (
    <section className="bd-section bg-secondary">
      <div className="bd-container max-w-4xl">
        <div className="text-center">
          <h2 className="bd-heading">
            Se hvordan det <span className="bd-heading-accent">fungerer</span>
          </h2>
          <p className="bd-body mx-auto mt-3 max-w-xl">
            Folg med nar vores cykelsmed kommer ud til en kunde og far cyklen
            koreklar pa stedet.
          </p>
        </div>

        {/* Video placeholder */}
        <div className="group relative mt-10 overflow-hidden rounded-2xl bg-primary/[0.04]">
          <div className="aspect-video w-full">
            <div className="flex size-full flex-col items-center justify-center gap-4">
              <div className="flex size-20 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/20 transition-transform group-hover:scale-105">
                <Play className="ml-1 size-8 text-accent-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Video kommer snart
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
