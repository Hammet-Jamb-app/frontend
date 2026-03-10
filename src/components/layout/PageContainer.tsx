export default function PageContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {children}
    </div>
  )
}