import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color?: "default" | "red" | "green"
}

export default function MetricCard({
  title,
  value,
  icon: Icon,
  color = "default",
}: MetricCardProps) {

  const valueColor = {
    default: "text-gray-900",
    red: "text-red-600",
    green: "text-green-600",
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 flex items-center justify-between">

      <div>

        <p className="text-sm text-gray-500">
          {title}
        </p>

        <p className={`text-3xl font-bold mt-1 ${valueColor[color]}`}>
          {value}
        </p>

      </div>

      <Icon className="text-gray-400" size={26} />

    </div>
  )
}