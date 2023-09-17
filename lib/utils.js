export function stripHtml(str) {
  return str?.replace(/<\/?[^>]+(>|$)/g, '')
}
