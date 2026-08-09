export function stripHtml(str) {
  return str?.replace(/<\/?[^>]+(>|$)/g, '')
}

export function truncate(str, maxLength) {
  if (!str || str.length <= maxLength) return str
  const trimmed = str.slice(0, maxLength)
  const lastSpace = trimmed.lastIndexOf(' ')
  return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed) + '…'
}

export function youTubeThumbnail(videoSrc) {
  const id = videoSrc?.split('/embed/')[1]?.split('?')[0]
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null
}

export function formatReflectionDate(isoDate) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export function partitionArray(arr, size) {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}
