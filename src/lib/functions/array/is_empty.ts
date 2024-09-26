export function is_empty(value: string | any[] | undefined) {
  return (
    value === undefined ||
    Array.isArray(value) && value.length === 0 ||
    typeof value === "string" && value === null
  )
}
