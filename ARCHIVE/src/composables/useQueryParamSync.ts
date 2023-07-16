import JsonURL from 'jsurl'
import { Ref, WatchSource } from 'nuxt/dist/app/compat/capi'

type TOptions = Partial<{
  runOnMounted: boolean
  watchDeep: boolean
  watchImmediate: boolean
  cb: (val: any) => void
}>

export const useQueryParamSync = <T extends WatchSource>(value: T, queryKey: string, options?: TOptions) => {
  const route = useRoute()
  const router = useRouter()
  watch(
    value,
    (v) => {
      const queryParam = JsonURL.stringify(v)
      router.replace({ path: '', query: { ...route.query, [queryKey]: queryParam } })
    },
    { deep: options?.watchDeep ?? false, immediate: options?.watchImmediate ?? false }
  )
  const parseQueryParam = () => {
    if (route.query?.[queryKey]) {
      try {
        const queryParamResolved = JsonURL.parse(route.query[queryKey] + '')
        if (isRef(value) && !isReadonly(value)) {
          ;(value as Ref).value = queryParamResolved
        }
        options?.cb?.(queryParamResolved)
      } catch (error) {
        const queryParamResolved = JSON.parse(decodeURIComponent(route.query[queryKey] + ''))
        if (isRef(value) && !isReadonly(value)) {
          ;(value as Ref).value = queryParamResolved
        }
        options?.cb?.(queryParamResolved)
      }
    }
  }
  watch(
    () => route.query?.[queryKey],
    () => {
      parseQueryParam()
    },
    { deep: options?.watchDeep ?? false, immediate: options?.watchImmediate ?? false }
  )

  if (options?.runOnMounted ?? false) {
    onMounted(() => {
      parseQueryParam()
    })
  }
}
