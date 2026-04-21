"use client"

import {
  BookOpen,
  GraduationCap,
  Layers3,
  Megaphone,
  Plus,
  Sparkles,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DashboardPage() {
  const stats = [
    {
      label: "Total Siswa",
      value: "156",
      description: "+12 dari bulan lalu",
      icon: Users,
      accent: "from-sky-500 to-cyan-500",
    },
    {
      label: "Total Guru",
      value: "24",
      description: "2 guru baru aktif",
      icon: GraduationCap,
      accent: "from-violet-500 to-fuchsia-500",
    },
    {
      label: "Kelas Aktif",
      value: "8",
      description: "Semua kelas terisi",
      icon: Layers3,
      accent: "from-emerald-500 to-teal-500",
    },
    {
      label: "Kehadiran Hari Ini",
      value: "92%",
      description: "Target 95%",
      icon: Sparkles,
      accent: "from-amber-500 to-orange-500",
    },
  ]

  const activities = [
    {
      title: "Jadwal kelas A1 diubah",
      time: "10:30",
      badge: "Jadwal",
      description: "Penyesuaian sesi pagi untuk kelas A1.",
    },
    {
      title: "Data siswa baru ditambahkan",
      time: "09:15",
      badge: "Data",
      description: "5 siswa baru berhasil tersimpan di sistem.",
    },
    {
      title: "Nilai siswa diperbarui",
      time: "08:45",
      badge: "Akademik",
      description: "Pembaruan nilai Matematika untuk kelas B.",
    },
    {
      title: "Pengumuman baru dipublikasikan",
      time: "08:00",
      badge: "Info",
      description: "Pengumuman libur sekolah tampil di dashboard.",
    },
  ]

  const quickActions = [
    {
      title: "Input Data Siswa",
      description: "Tambah siswa baru dengan form standar.",
      icon: Plus,
      variant: "default" as const,
    },
    {
      title: "Lihat Guru",
      description: "Pantau daftar guru dan status aktif.",
      icon: Users,
      variant: "outline" as const,
    },
    {
      title: "Laporan Nilai",
      description: "Buka ringkasan performa belajar.",
      icon: BookOpen,
      variant: "outline" as const,
    },
    {
      title: "Buat Pengumuman",
      description: "Publikasikan info penting ke orang tua.",
      icon: Megaphone,
      variant: "outline" as const,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/70">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-300">
            Dashboard
          </Badge>
          <Badge
            variant="outline"
            className="border-emerald-200 text-emerald-700 dark:border-emerald-900/60 dark:text-emerald-300"
          >
            SiPintar
          </Badge>
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Selamat Datang
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Kelola aktivitas harian, pantau ringkasan data, dan akses aksi cepat dari satu tempat.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <Card
              key={stat.label}
              className="border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/70"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {stat.description}
                    </p>
                  </div>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${stat.accent} text-white shadow-lg shadow-slate-900/10`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/70">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 dark:text-white">
              Aktivitas Terbaru
            </CardTitle>
            <CardDescription>
              Ringkasan kegiatan yang baru saja terjadi di sistem.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="flex items-start gap-4 rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 transition-colors hover:bg-slate-100/80 dark:border-slate-800/70 dark:bg-slate-950/40 dark:hover:bg-slate-900"
              >
                <div className="mt-0.5 rounded-xl bg-slate-900 p-2 text-white dark:bg-white dark:text-slate-900">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {activity.title}
                    </p>
                    <Badge
                      variant="outline"
                      className="border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                    >
                      {activity.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {activity.description}
                  </p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/70">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 dark:text-white">
              Tautan Cepat
            </CardTitle>
            <CardDescription>Aksi yang paling sering dipakai.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon

              return (
                <Button
                  key={action.title}
                  variant={action.variant}
                  className="h-auto w-full justify-start gap-3 rounded-2xl px-4 py-3 text-left"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.variant === "default" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="font-medium">{action.title}</span>
                    <span
                      className={
                        action.variant === "default"
                          ? "text-left text-xs text-white/80"
                          : "text-left text-xs text-slate-500 dark:text-slate-400"
                      }
                    >
                      {action.description}
                    </span>
                  </div>
                </Button>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
