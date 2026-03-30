export function stripHtml(str) {
  return str?.replace(/<\/?[^>]+(>|$)/g, '')
}

export function truncate(str, maxLength) {
  if (!str || str.length <= maxLength) return str
  const trimmed = str.slice(0, maxLength)
  const lastSpace = trimmed.lastIndexOf(' ')
  return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed) + '…'
}

export function partitionArray(arr, size) {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}
