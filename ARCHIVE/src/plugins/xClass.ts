import { CxOptions, cva, cx } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
export type XClass = {
  extend?: string
  base?: string
}
export default defineNuxtPlugin((nuxtApp) => {
  const extendClasses = (base: string, xClass?: XClass) => {
    return {
      [xClass?.base ?? base]: true,
      [xClass?.extend ?? '']: true,
    }
  }
  return {
    provide: {
      cva: cva,
      cx: <T extends CxOptions>(...classes: T) => twMerge(cx(classes)),
      // xClass: extendClasses,
      classes: extendClasses,
    },
  }
})
