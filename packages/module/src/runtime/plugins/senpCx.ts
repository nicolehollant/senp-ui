import { defineNuxtPlugin } from "#imports";
import { type CxOptions, cva, cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
export type SenpCx = {
  extend?: string;
  base?: string;
};
export default defineNuxtPlugin(() => {
  const extendClasses = (base: string, senpCx?: SenpCx) => {
    return {
      [senpCx?.base ?? base]: true,
      [senpCx?.extend ?? ""]: true,
    };
  };
  return {
    provide: {
      cva: cva,
      cx: <T extends CxOptions>(...classes: T) => twMerge(cx(classes)),
      // xClass: extendClasses,
      senpCx: extendClasses,
      // classes: extendClasses,
    },
  };
});
