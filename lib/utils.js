export function stripHtml(str) {
  return str?.replace(/<\/?[^>]+(>|$)/g, '')
}

export function partitionArray(arr, size) {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}
