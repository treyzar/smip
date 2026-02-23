import Link from "next/link"

const footerLinks = {
  Продукт: [
    { label: "Преимущества", href: "#features" },
    { label: "Тарифы", href: "#pricing" },
    { label: "Как это работает", href: "#process" },
  ],
  Поддержка: [
    { label: "Документация", href: "#" },
    { label: "API", href: "#" },
    { label: "Контакты", href: "#cta" },
  ],
  Компания: [
    { label: "О нас", href: "#" },
    { label: "Блог", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="px-6 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="border-t border-border pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-sm tracking-[0.2em] uppercase text-foreground">
                  SMIP
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-8">
                Платформа нового поколения для глубокой аналитики блогеров и автоматизации социальных сетей с AI.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground tracking-[0.1em] uppercase">
                  Все системы работают
                </span>
              </div>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-foreground mb-6">
                  {category}
                </h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50">
            <p className="text-muted-foreground/60 text-xs tracking-[0.1em]">
              2026 SMIP. Все права защищены.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground/60 text-xs hover:text-primary transition-colors duration-300">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-muted-foreground/60 text-xs hover:text-primary transition-colors duration-300">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
