export function truncateMiddle(text: string, maxLength: number) {
  if (text.length <= maxLength) { return text }

  const half = maxLength / 2
  return `${text.slice(0, half)}...${text.slice(-half)}`
}
