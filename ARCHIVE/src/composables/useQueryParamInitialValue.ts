import JsonURL from 'jsurl'

export const useQueryParamInitialValue = (fromValue: any, defaultValue: any, assertions?: ((v: any) => boolean)[]) => {
  if (typeof fromValue === 'object') {
    if (!assertions) {
      return fromValue
    } else if (assertions.every((assertion) => assertion(fromValue))) {
      return fromValue
    }
  }
  if (typeof fromValue === 'string') {
    try {
      const val = JsonURL.parse(fromValue + '')
      if (!assertions) {
        return val
      } else if (assertions.every((assertion) => assertion(val))) {
        return val
      }
    } catch (error) {
      const val = JSON.parse(decodeURIComponent(fromValue + ''))
      if (!assertions) {
        return val
      } else if (assertions.every((assertion) => assertion(val))) {
        return val
      }
    }
  }
  return defaultValue
}
