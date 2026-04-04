"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BadgeCheck, Clock3, ShieldCheck } from "lucide-react"

const faqItems = [
  {
    value: "setup",
    question: "Сколько времени занимает запуск?",
    answer:
      "Первый рабочий сценарий можно показать уже на демо. Для старта достаточно списка блогеров, ссылок на интеграции и выгрузки по продажам. Без долгого внедрения и сложной интеграции на первом этапе.",
  },
  {
    value: "sources",
    question: "Какие данные попадают в SMIP?",
    answer:
      "SMIP собирает метрики из соцсетей, связывает их с данными маркетплейсов и выводит все в одном месте. Команда видит просмотры, вовлеченность, блогеров, публикации, продажи и итоговый ROMI по каждой интеграции.",
  },
  {
    value: "accuracy",
    question: "Как понять, что аналитике можно доверять?",
    answer:
      "Мы показываем логику расчета и путь данных: от публикации и блогера до продаж и итогового отчета. На демо разбираем конкретный кейс, чтобы команда сразу увидела, как строится прозрачная атрибуция.",
  },
  {
    value: "team",
    question: "Подходит ли это не только брендам, но и агентствам?",
    answer:
      "Да. SMIP подходит брендам, e-commerce-командам, селлерам и агентствам, которым нужно одновременно вести много блогеров, быстро собирать отчеты и принимать решения не по ощущениям, а по цифрам.",
  },
  {
    value: "demo",
    question: "Что вы покажете на демо?",
    answer:
      "Покажем live-дашборд, расскажем, какие отчеты будут у команды, как сопоставляются данные с Wildberries и где вы быстрее всего получите эффект: в отчетности, контроле интеграций или поиске слабых блогеров.",
  },
]

const trustPoints = [
  {
    icon: Clock3,
    title: "Демо за 30 минут",
    description: "Без длинных созвонов и сложной подготовки.",
  },
  {
    icon: BadgeCheck,
    title: "Прозрачная логика ROMI",
    description: "Понимаете, какие интеграции работают, а какие нет.",
  },
  {
    icon: ShieldCheck,
    title: "Меньше ручной рутины",
    description: "Команда перестает собирать отчеты в таблицах вручную.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="px-6 py-20 lg:px-8 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/4 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-xs tracking-[0.15em] uppercase mb-5 font-medium">
                FAQ и возражения
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-[-0.02em] text-foreground mb-4 text-balance">
                Что важно понять <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">до заявки</span>
              </h2>
              <p className="text-foreground/72 text-base lg:text-lg max-w-xl">
                Закрыли главные вопросы, которые обычно тормозят решение: запуск, данные, прозрачность
                аналитики и формат демо.
              </p>
            </div>

            <div className="grid gap-3">
              {trustPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 shrink-0 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-center">
                      <point.icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">{point.title}</h3>
                      <p className="text-sm text-foreground/65 leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm p-5 lg:p-7"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item) => (
                <AccordionItem key={item.value} value={item.value} className="border-border/60">
                  <AccordionTrigger className="text-base text-foreground hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-foreground/68">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
