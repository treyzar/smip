"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { X, ExternalLink, RefreshCw, MoreVertical } from "lucide-react"

const SECTION_HEADER_BG = "bg-[#1a3d2e]"
const METRIC_BLUE = "text-[#3b82f6]"

const chartData = [
  { date: "22.12", охват: 1200, лайки: 800 },
  { date: "29.12", охват: 1800, лайки: 950 },
  { date: "05.01", охват: 2200, лайки: 1100 },
  { date: "12.01", охват: 2800, лайки: 1300 },
  { date: "19.01", охват: 3200, лайки: 1500 },
  { date: "26.01", охват: 3500, лайки: 1650 },
  { date: "02.02", охват: 3800, лайки: 1800 },
  { date: "09.02", охват: 3400, лайки: 1700 },
  { date: "16.02", охват: 3600, лайки: 1750 },
  { date: "23.02", охват: 3900, лайки: 1900 },
  { date: "02.03", охват: 4200, лайки: 2000 },
  { date: "09.03", охват: 4000, лайки: 1950 },
  { date: "16.03", охват: 3800, лайки: 1850 },
]

const tableData = [
  { fio: "Федоренко Владислав", username: "voptimum_system", охват: "3 301 825" },
  { fio: "Шурыгина Юлия", username: "u.shurigina_optim", охват: "330 144" },
  { fio: "Кичаева Валерия", username: "kichaeva_kreators", охват: "271 105" },
  { fio: "Иванов Алексей", username: "ivanov_alex", охват: "245 890" },
  { fio: "Петрова Мария", username: "petrova_m", охват: "198 432" },
  { fio: "Сидоров Дмитрий", username: "sidorov_d", охват: "176 521" },
  { fio: "Козлова Анна", username: "kozlova_anna", охват: "154 890" },
  { fio: "Новиков Сергей", username: "novikov_s", охват: "132 456" },
  { fio: "Морозова Елена", username: "morozova_e", охват: "118 234" },
  { fio: "Волков Андрей", username: "volkov_a", охват: "105 678" },
]

const metricTabs = [
  { id: "metrics", label: "Метрики" },
  { id: "reach", label: "Охват" },
  { id: "likes", label: "Лайки" },
  { id: "comments", label: "Комментарии" },
  { id: "reposts", label: "Репосты" },
  { id: "videos", label: "Кол-во видео" },
]

export function AnalyticsDashboard() {
  const [chartTab, setChartTab] = useState("metrics")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">DATALENS ДАШБОРД</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Визуализация данных и аналитика
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            <ExternalLink className="w-4 h-4" />
            ОТКРЫТЬ В DATALENS
          </button>
          <button
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Обновить"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Дополнительно"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-border">
        {[
          "Ролики - OS",
          "Блогеры - OS",
          "Сценаристы - OS",
          "WB - OS",
          "Ролики - UPG",
          "Блогеры - UPG",
          "Сценаристы - UPG",
        ].map((tab, i) => (
          <button
            key={tab}
            className={cn(
              "px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              i === 0
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        <div className={cn("px-4 py-2 text-sm font-medium text-foreground", SECTION_HEADER_BG)}>
          Селекторы
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 p-4 bg-card/50 border border-t-0 border-border">
          <DateFilter />
          <FilterSelect label="ФИО" placeholder="Нет выбранных значений" />
          <FilterSelect label="Ссылка на пост" placeholder="Нет выбранных значений" />
          <FilterSelect label="Артикул" placeholder="Нет выбранных значений" />
          <FilterSelect label="Сценарист" placeholder="Нет выбранных значений" />
          <FilterSelect label="Назв. прод." placeholder="Нет выбранных значений" />
          <FilterSelect label="Платформа" placeholder="Нет выбранных значений" />
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Артикул содержит</label>
            <Input
              placeholder=""
              className="bg-secondary/50 border-border h-9 text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <div className={cn("px-4 py-2 text-sm font-medium text-foreground", SECTION_HEADER_BG)}>
          Метрики
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-card/50 border border-t-0 border-border">
          <MetricCard label="Охват" value="9 415 918" />
          <MetricCard label="Сумма лайков" value="61 878" />
          <MetricCard label="Сумма комментов" value="3 263" />
          <MetricCard label="Сумма репостов" value="5 521" />
          <MetricCard label="Кол-во видео" value="16 029" />
          <MetricCard label="ER" value="0,75%" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card/50 border border-border rounded-b-lg overflow-hidden">
          <div className="flex items-center gap-2 p-3 border-b border-border overflow-x-auto">
            {metricTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setChartTab(tab.id)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                  chartTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-4 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11 }}
                />
                <YAxis
                  yAxisId="left"
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11 }}
                  tickFormatter={(v) => `${v / 1000}K`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1f2e",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#f0f2f5" }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="охват"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  name="Охват"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="лайки"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                  name="Лайки"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card/50 border border-border rounded-lg overflow-hidden flex flex-col">
          <div className="p-3 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Топ по охвату</h3>
          </div>
          <div className="flex-1 overflow-auto max-h-[380px]">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-medium text-xs">ФИО</TableHead>
                  <TableHead className="text-muted-foreground font-medium text-xs">Username</TableHead>
                  <TableHead className="text-muted-foreground font-medium text-xs text-right">Охват</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, i) => (
                  <TableRow key={i} className="border-border/50">
                    <TableCell className="text-sm text-foreground py-2.5">{row.fio}</TableCell>
                    <TableCell className="text-sm text-muted-foreground py-2.5">{row.username}</TableCell>
                    <TableCell className="text-sm text-foreground font-medium text-right py-2.5">{row.охват}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

function DateFilter() {
  return (
    <div className="space-y-1">
      <label className="text-xs text-muted-foreground">Дата</label>
      <div className="flex items-center gap-1 bg-secondary/50 border border-border rounded-md h-9 px-2">
        <span className="flex-1 text-sm text-muted-foreground truncate">
          Не определено - Не определено
        </span>
        <button
          type="button"
          className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Сбросить дату"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

function FilterSelect({
  label,
  placeholder,
}: {
  label: string
  placeholder: string
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-muted-foreground">{label}</label>
      <Select>
        <SelectTrigger className="w-full bg-secondary/50 border-border h-9 text-sm">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          <SelectItem value="1">Вариант 1</SelectItem>
          <SelectItem value="2">Вариант 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className={cn("text-xl font-bold", METRIC_BLUE)}>{value}</div>
    </div>
  )
}
