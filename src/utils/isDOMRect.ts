export function isDOMRect(value: any): value is DOMRect {
  return (
    value.top != null &&
    value.width != null &&
    value.left != null &&
    value.height != null
  )
}
