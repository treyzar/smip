"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  TrendingUp, 
  Users, 
  Eye, 
  BarChart3, 
  ArrowUpRight,
  Play,
  DollarSign,
  Target,
  Zap
} from "lucide-react"

const tabs = [
  { id: "views", label: "Просмотры", icon: Eye },
  { id: "bloggers", label: "Блогеры", icon: Users },
  { id: "ads", label: "Реклама", icon: Target },
  { id: "roi", label: "ROI", icon: DollarSign },
]

// Realistic demo data - monthly performance
const chartData = {
  views: [42, 38, 51, 67, 73, 68, 82, 91, 87, 94, 102, 118],
  bloggers: [23, 27, 31, 38, 45, 52, 58, 64, 71, 79, 86, 94],
  ads: [18, 24, 31, 42, 38, 55, 61, 58, 72, 85, 91, 97],
  roi: [156, 178, 195, 224, 238, 252, 271, 289, 298, 312, 328, 347],
}

const bloggersList = [
  { name: "@mariya_lifestyle", followers: "847K", engagement: "4.8%", roi: "+312%", avatar: "М" },
  { name: "@tech_andrey", followers: "523K", engagement: "5.1%", roi: "+287%", avatar: "А" },
  { name: "@foodie_kate", followers: "391K", engagement: "6.3%", roi: "+425%", avatar: "К" },
  { name: "@fitness_max", followers: "276K", engagement: "7.8%", roi: "+198%", avatar: "М" },
]

const adsTable = [
  { campaign: "Летний сезон 2024", blogger: "@mariya_lifestyle", views: "2.4M", ctr: "4.2%", status: "active" },
  { campaign: "Обзор гаджетов", blogger: "@tech_andrey", views: "1.1M", ctr: "3.8%", status: "active" },
  { campaign: "ЗОЖ-марафон", blogger: "@fitness_max", views: "876K", ctr: "5.7%", status: "completed" },
]

export function InteractiveDashboardDemo() {
  const [activeTab, setActiveTab] = useState("views")
  const [isAnimating, setIsAnimating] = useState(true)
  const [currentMetrics, setCurrentMetrics] = useState({
    totalViews: 0,
    totalBloggers: 0,
    avgEngagement: 0,
    totalROI: 0,
  })

  // Auto-cycle tabs for demo effect
  useEffect(() => {
    if (!isAnimating) return
    
    const interval = setInterval(() => {
      setActiveTab(prev => {
        const currentIndex = tabs.findIndex(t => t.id === prev)
        return tabs[(currentIndex + 1) % tabs.length].id
      })
    }, 4000)
    
    return () => clearInterval(interval)
  }, [isAnimating])

  // Animate metrics on mount - realistic numbers
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps
    
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      setCurrentMetrics({
        totalViews: Math.round(8.7 * progress * 10) / 10,
        totalBloggers: Math.round(94 * progress),
        avgEngagement: Math.round(5.4 * progress * 10) / 10,
        totalROI: Math.round(347 * progress),
      })
      
      if (step >= steps) clearInterval(timer)
    }, interval)
    
    return () => clearInterval(timer)
  }, [])

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto"
      onMouseEnter={() => setIsAnimating(false)}
      onMouseLeave={() => setIsAnimating(true)}
    >
      {/* Browser chrome */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-t-2xl bg-card border border-border p-4 flex items-center gap-3"
      >
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-muted rounded-lg px-4 py-1.5 text-sm text-foreground/70 flex items-center gap-2">
            <span className="text-primary">●</span>
            app.smip.panel/dashboard
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary font-medium">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Live
        </div>
      </motion.div>

      {/* Dashboard content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-b-2xl bg-background border border-t-0 border-border p-6 lg:p-8"
      >
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard 
            icon={Eye}
            label="Просмотры"
            value={`${currentMetrics.totalViews}M`}
            change="+23.4%"
            positive
            delay={0}
          />
          <KPICard 
            icon={Users}
            label="Блогеров"
            value={currentMetrics.totalBloggers.toString()}
            change="+8"
            positive
            delay={0.1}
          />
          <KPICard 
            icon={Zap}
            label="Вовлечённость"
            value={`${currentMetrics.avgEngagement}%`}
            change="+0.9%"
            positive
            delay={0.2}
          />
          <KPICard 
            icon={TrendingUp}
            label="ROI кампаний"
            value={`${currentMetrics.totalROI}%`}
            change="+58%"
            positive
            delay={0.3}
          />
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setIsAnimating(false)
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground/70 hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "views" && <ViewsPanel data={chartData.views} />}
            {activeTab === "bloggers" && <BloggersPanel bloggers={bloggersList} />}
            {activeTab === "ads" && <AdsPanel ads={adsTable} />}
            {activeTab === "roi" && <ROIPanel data={chartData.roi} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Vibrant glow effects */}
      <div className="absolute -inset-8 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-3xl blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/15 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-accent/10 rounded-full blur-[80px] -z-10" />
    </div>
  )
}

function KPICard({ 
  icon: Icon, 
  label, 
  value, 
  change, 
  positive,
  delay 
}: { 
  icon: React.ElementType
  label: string
  value: string
  change: string
  positive?: boolean
  delay: number
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 relative overflow-hidden"
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center group-hover:from-primary/25 group-hover:to-accent/25 transition-colors">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm text-foreground/70">{label}</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-2xl lg:text-3xl font-bold text-foreground">{value}</span>
          <span className={`text-sm flex items-center gap-0.5 font-medium ${positive ? 'text-emerald-400' : 'text-red-400'}`}>
            <ArrowUpRight className="w-4 h-4" />
            {change}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function ViewsPanel({ data }: { data: number[] }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Динамика просмотров</h3>
          <p className="text-sm text-foreground/60">За последние 12 месяцев</p>
        </div>
        <div className="flex items-center gap-2 text-primary font-medium">
          <TrendingUp className="w-4 h-4" />
          +23% vs прошлый год
        </div>
      </div>
      <div className="flex items-end justify-between h-40 gap-2">
        {data.map((height, i) => (
          <motion.div 
            key={i}
            className="flex-1 bg-primary/10 rounded-t-md relative overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <motion.div 
              className="absolute bottom-0 w-full bg-primary rounded-t-md"
              initial={{ height: 0 }}
              animate={{ height: "60%" }}
              transition={{ duration: 0.5, delay: i * 0.05 + 0.2 }}
            />
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between mt-3 text-xs text-foreground/50">
        {["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"].map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  )
}

function BloggersPanel({ bloggers }: { bloggers: typeof bloggersList }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Топ инфлюенсеров</h3>
          <p className="text-sm text-foreground/60">По эффективности кампаний</p>
        </div>
        <button className="text-sm text-primary font-medium hover:underline">Все блогеры</button>
      </div>
      <div className="space-y-3">
        {bloggers.map((blogger, i) => (
          <motion.div 
            key={blogger.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                {blogger.avatar}
              </div>
              <div>
                <span className="text-foreground font-medium">{blogger.name}</span>
                <div className="text-xs text-foreground/60">{blogger.followers} подписчиков</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-foreground/60 text-xs">ER</div>
                <div className="text-foreground font-medium">{blogger.engagement}</div>
              </div>
              <div className="text-center">
                <div className="text-foreground/60 text-xs">ROI</div>
                <div className="text-green-400 font-medium">{blogger.roi}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function AdsPanel({ ads }: { ads: typeof adsTable }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 overflow-x-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Рекламные кампании</h3>
          <p className="text-sm text-foreground/60">Активные и завершённые интеграции</p>
        </div>
        <button className="text-sm text-primary font-medium hover:underline">Добавить кампанию</button>
      </div>
      <table className="w-full min-w-[500px]">
        <thead>
          <tr className="text-left text-sm text-foreground/60 border-b border-border">
            <th className="pb-3 font-medium">Кампания</th>
            <th className="pb-3 font-medium">Блогер</th>
            <th className="pb-3 font-medium">Просмотры</th>
            <th className="pb-3 font-medium">CTR</th>
            <th className="pb-3 font-medium">Статус</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad, i) => (
            <motion.tr 
              key={ad.campaign}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="border-b border-border/50 last:border-0"
            >
              <td className="py-4 text-foreground font-medium">{ad.campaign}</td>
              <td className="py-4 text-foreground/80">{ad.blogger}</td>
              <td className="py-4 text-foreground/80">{ad.views}</td>
              <td className="py-4 text-primary font-medium">{ad.ctr}</td>
              <td className="py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  ad.status === "active" 
                    ? "bg-green-500/10 text-green-400" 
                    : "bg-foreground/10 text-foreground/60"
                }`}>
                  {ad.status === "active" ? "Активна" : "Завершена"}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ROIPanel({ data }: { data: number[] }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">ROI по кампаниям</h3>
          <p className="text-sm text-foreground/60">Возврат инвестиций за 12 месяцев</p>
        </div>
        <div className="flex items-center gap-2 text-primary font-medium">
          <DollarSign className="w-4 h-4" />
          Средний ROI: 347%
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">2.8M</div>
          <div className="text-sm text-foreground/60">Инвестировано</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">12.5M</div>
          <div className="text-sm text-foreground/60">Доход</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">347%</div>
          <div className="text-sm text-foreground/60">Средний ROI</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">127</div>
          <div className="text-sm text-foreground/60">Кампаний</div>
        </div>
      </div>
      <div className="flex items-end justify-between h-32 gap-2">
        {data.map((height, i) => (
          <motion.div 
            key={i}
            className="flex-1 rounded-t-md overflow-hidden"
            style={{ backgroundColor: height > 70 ? "rgba(0, 229, 176, 0.3)" : "rgba(0, 229, 176, 0.1)" }}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <motion.div 
              className="w-full bg-primary rounded-t-md"
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 0.5, delay: i * 0.05 + 0.2 }}
              style={{ height: `${Math.min(height * 0.7, 100)}%` }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
