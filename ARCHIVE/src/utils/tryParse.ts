export const tryParseOrDefault = (val: string, replacement: any = undefined) => {
  try {
    return JSON.parse(val)
  } catch (error) {
    return replacement
  }
}
