import { Badge } from "@/components/ui/badge"

export default function BadgeStatus({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    active: "border-emerald-200 bg-emerald-50 text-emerald-700",
    inactive: "border-slate-200 bg-slate-100 text-slate-700",
    pending: "border-amber-200 bg-amber-50 text-amber-700",
    suspended: "border-rose-200 bg-rose-50 text-rose-700",
  }

  const normalizedStatus = status.toLowerCase()

  return (
    <Badge className={statusStyles[normalizedStatus] || statusStyles.inactive}>
      {status.toUpperCase()}
    </Badge>
  )
}