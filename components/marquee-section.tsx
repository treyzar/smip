const items = [
  "НЕЙРОСЕТЬ",
  "АВТОМАТИЗАЦИЯ",
  "АНАЛИТИКА",
  "КОНТРОЛЬ",
  "МАСШТАБ",
  "ИНТЕЛЛЕКТ",
  "БЕЗОПАСНОСТЬ",
  "СКОРОСТЬ",
]

export function MarqueeSection() {
  return (
    <section className="py-12 overflow-hidden border-y border-border">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center flex-shrink-0 mx-8 lg:mx-12">
            <div className="w-2 h-2 rounded-full bg-primary/50 mr-8 lg:mr-12 flex-shrink-0" />
            <span className="text-2xl lg:text-4xl font-bold tracking-[0.1em] uppercase text-foreground/15">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
