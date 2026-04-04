import Link from "next/link"

const footerLinks = {
  Продукт: [
    { label: "Почему SMIP", href: "#features" },
    { label: "Как это работает", href: "#process" },
    { label: "Результаты", href: "#benefits" },
  ],
  Поддержка: [
    { label: "FAQ", href: "#faq" },
    { label: "Демо", href: "#cta" },
    { label: "Live-дашборд", href: "#demo" },
  ],
  Компания: [
    { label: "Написать на hello@smip.panel", href: "mailto:hello@smip.panel" },
    { label: "@smip_support", href: "https://t.me/smip_support" },
  ],
}

export function Footer() {
  return (
    <footer className="px-6 py-14 lg:px-8 lg:py-18 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="border-t border-border/40 pt-14">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-5 group">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/25">
                  <span className="text-primary-foreground font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-sm tracking-[0.2em] uppercase text-foreground/90 group-hover:text-primary transition-colors duration-300">
                  SMIP
                </span>
              </Link>
              <p className="text-foreground/65 text-sm leading-relaxed max-w-xs mb-6">
                Платформа для команд, которым нужно быстрее считать эффективность блогеров, видеть ROMI и
                перестать собирать отчеты вручную.
              </p>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/8 border border-emerald-500/15 w-fit">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-[10px] text-emerald-400 tracking-[0.1em] uppercase font-medium">
                  Все системы работают
                </span>
              </div>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/70 mb-5">
                  {category}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-foreground/60 text-sm hover:text-primary transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-border/30">
            <p className="text-foreground/40 text-xs tracking-[0.08em]">
              2026 SMIP. Все права защищены.
            </p>
            <div className="flex items-center gap-5">
              <a href="mailto:hello@smip.panel" className="text-foreground/40 text-xs hover:text-primary transition-colors duration-300">
                hello@smip.panel
              </a>
              <a href="#cta" className="text-foreground/40 text-xs hover:text-primary transition-colors duration-300">
                Запросить демо
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
