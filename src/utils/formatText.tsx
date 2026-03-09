export function formatBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const clean = part.slice(2, -2)
      return <strong key={index}>{clean}</strong>
    }
    return part
  })
}