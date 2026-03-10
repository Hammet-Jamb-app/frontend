interface PageHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
}

export default function PageHeader({
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between">

      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div>
          {actions}
        </div>
      )}

    </div>
  )
}