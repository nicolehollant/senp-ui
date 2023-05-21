import { v4 } from 'uuid'
import defu from 'defu'

export type Toast = {
  type: 'info' | 'success' | 'warning' | 'error'
  placement: 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right'
  title?: string | null
  content?: string | null
  durationMs?: number | null
}

export const DefaultToast: Toast = {
  type: 'info',
  placement: 'top-right',
  title: null,
  content: null,
  durationMs: null,
}

export default defineNuxtPlugin(() => {
  const toasts = reactive<(Toast & { id: string })[]>([])
  const add = (toast: Toast) => {
    toasts.unshift(defu({ ...toast, id: v4() }, DefaultToast))
  }

  const success = (content: string, toast: Partial<Toast> = {}) => {
    toasts.unshift(defu({ ...(toast as Toast), content, id: v4() }, { ...DefaultToast, type: 'success' }))
  }
  const info = (content: string, toast: Partial<Toast> = {}) => {
    toasts.unshift(defu({ ...(toast as Toast), content, id: v4() }, { ...DefaultToast, type: 'info' }))
  }
  const error = (content: string, toast: Partial<Toast> = {}) => {
    toasts.unshift(defu({ ...(toast as Toast), content, id: v4() }, { ...DefaultToast, type: 'error' }))
  }
  const warning = (content: string, toast: Partial<Toast> = {}) => {
    toasts.unshift(defu({ ...(toast as Toast), content, id: v4() }, { ...DefaultToast, type: 'warning' }))
  }

  const removeIndex = (index = 0) => {
    toasts.splice(index, 1)
  }
  const removeId = (id: string) => {
    toasts.splice(
      toasts.findIndex((a) => a.id === id),
      1
    )
  }
  return {
    provide: {
      toast: {
        add,
        removeIndex,
        removeId,
        toasts,
        success,
        info,
        error,
        warning,
      },
    },
  }
})
