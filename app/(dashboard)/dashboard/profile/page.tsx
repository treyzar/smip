"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Save,
  Camera,
  User,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Shield,
  Building2,
  Link2,
  Loader2,
} from "lucide-react"
import { useAuth } from "@/lib/auth"

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [companyName, setCompanyName] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [savedProfile, setSavedProfile] = useState(false)
  const [savedPassword, setSavedPassword] = useState(false)
  const [sheetUrl, setSheetUrl] = useState("")
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setCompanyName(user.username || "")

      if (user.google_sheet_url) {
        setSheetUrl(user.google_sheet_url)
        // Also sync to local storage for backward compatibility
        localStorage.setItem("smip_google_sheet_url", user.google_sheet_url)
        window.dispatchEvent(new Event("storage"))
      } else {
        const stored = localStorage.getItem("smip_google_sheet_url")
        if (stored) setSheetUrl(stored)
      }
    }
  }, [user])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setAvatarPreview(ev.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingProfile(true)
    try {
      await updateUser({ google_sheet_url: sheetUrl })

      localStorage.setItem("smip_google_sheet_url", sheetUrl)
      window.dispatchEvent(new Event("storage"))

      setSavedProfile(true)
      setTimeout(() => setSavedProfile(false), 2000)
    } catch (error) {
      console.error("Failed to save profile", error)
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedPassword(true)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setTimeout(() => setSavedPassword(false), 2000)
  }

  const passwordStrength = (pwd: string): { label: string; color: string; width: string } => {
    if (!pwd) return { label: "", color: "", width: "0%" }
    if (pwd.length < 6) return { label: "Слабый", color: "bg-destructive", width: "25%" }
    if (pwd.length < 10) return { label: "Средний", color: "bg-chart-4", width: "50%" }
    if (/[A-Z]/.test(pwd) && /\d/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) {
      return { label: "Надежный", color: "bg-primary", width: "100%" }
    }
    return { label: "Хороший", color: "bg-chart-2", width: "75%" }
  }

  const strength = passwordStrength(newPassword)

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      <form onSubmit={handleSaveProfile} className="flex flex-col gap-8">
        {/* Avatar & Personal Info */}
        <section className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 lg:p-8">
          <h2 className="text-base font-bold uppercase tracking-[0.1em] text-foreground mb-8">
            Личная информация
          </h2>

          <div className="flex flex-col gap-8">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-20 h-20 rounded-2xl bg-secondary border-2 border-border overflow-hidden flex items-center justify-center transition-all duration-200 group-hover:border-primary/40">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Аватар"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
                  aria-label="Загрузить аватар"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  aria-label="Выбрать файл аватара"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Фото профиля</p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG или GIF. Максимум 2MB.
                </p>
              </div>
            </div>

            {/* Company Name */}
            <div className="flex flex-col gap-2.5">
              <Label className="text-xs tracking-[0.1em] uppercase text-muted-foreground flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5" />
                Название компании
              </Label>
              <Input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Введите название компании"
                className="h-11 rounded-xl bg-secondary border-border text-foreground placeholder:text-muted-foreground/50"
              />
            </div>

          </div>
        </section>

        {/* Google Sheets URL */}
        <section className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Link2 className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold uppercase tracking-[0.1em] text-foreground">
              Google Таблица
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Вставьте URL вашей Google Таблицы. Она будет отображаться на странице парсинга. Убедитесь, что таблица доступна по ссылке (Файл &rarr; Поделиться &rarr; Все, у кого есть ссылка).
          </p>
          <div className="flex flex-col gap-3">
            <Label htmlFor="sheet-url" className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
              URL таблицы
            </Label>
            <Input
              id="sheet-url"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/..."
              className="w-full bg-secondary/30 border-border text-foreground placeholder:text-muted-foreground"
            />
            {sheetUrl && (
              <p className="text-xs text-muted-foreground">
                Таблица будет встроена на странице &laquo;Парсинг&raquo;
              </p>
            )}
          </div>
        </section>

        {/* Save button */}
        <div className="flex items-center justify-end gap-4 mt-2">
          {savedProfile && (
            <span className="flex items-center gap-1.5 text-xs text-primary animate-fade-in-up">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Данные сохранены
            </span>
          )}
          <Button
            type="submit"
            size="sm"
            className="rounded-lg text-xs tracking-[0.05em] uppercase gap-2 min-w-[180px]"
            disabled={isSavingProfile}
          >
            {isSavingProfile ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Сохранение...
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                Сохранить изменения
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Change Password */}
      <section className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold uppercase tracking-[0.1em] text-foreground">
            Смена пароля
          </h2>
        </div>

        <form onSubmit={handleSavePassword} className="flex flex-col gap-5">
          {/* Current password */}
          <div className="flex flex-col gap-2.5">
            <Label className="text-xs tracking-[0.1em] uppercase text-muted-foreground flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              Текущий пароль
            </Label>
            <div className="relative">
              <Input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Введите текущий пароль"
                className="h-11 rounded-xl bg-secondary border-border text-foreground placeholder:text-muted-foreground/50 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showCurrentPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New password */}
          <div className="flex flex-col gap-2.5">
            <Label className="text-xs tracking-[0.1em] uppercase text-muted-foreground flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              Новый пароль
            </Label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Введите новый пароль"
                className="h-11 rounded-xl bg-secondary border-border text-foreground placeholder:text-muted-foreground/50 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showNewPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Password strength indicator */}
            {newPassword && (
              <div className="flex items-center gap-3 mt-1">
                <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                    style={{ width: strength.width }}
                  />
                </div>
                <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground min-w-16 text-right">
                  {strength.label}
                </span>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-2.5">
            <Label className="text-xs tracking-[0.1em] uppercase text-muted-foreground flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              Подтвердите пароль
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторите новый пароль"
                className={`h-11 rounded-xl bg-secondary border-border text-foreground placeholder:text-muted-foreground/50 pr-11 ${confirmPassword && confirmPassword !== newPassword
                  ? "border-destructive/50 focus-visible:ring-destructive/50"
                  : ""
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showConfirmPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword && confirmPassword !== newPassword && (
              <p className="text-[10px] tracking-[0.1em] uppercase text-destructive">
                Пароли не совпадают
              </p>
            )}
          </div>

          {/* Save button */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              {savedPassword && (
                <span className="flex items-center gap-1.5 text-xs text-primary animate-fade-in-up">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Пароль обновлен
                </span>
              )}
            </div>
            <Button
              type="submit"
              size="sm"
              className="rounded-lg text-xs tracking-[0.05em] uppercase gap-2"
              disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
            >
              <Lock className="w-3.5 h-3.5" />
              Обновить пароль
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}
