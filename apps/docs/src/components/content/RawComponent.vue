<template>
  <SenpHighlight
    class="not-prose !rounded-lg [&_pre]:!rounded-lg [&_code]:max-h-80 [&_code]:overflow-auto !bg-gray-950"
    v-if="content"
    :value="content"
    :language="language"
  ></SenpHighlight>
</template>

<script setup lang="ts">
const props = defineProps<{
  /**
   * absolute path to import
   */
  path?: string
  value?: string
  senpUiModuleContains?: string
  localModuleContains?: string
  /**
   * language for syntax highlighting
   */
  language: any
}>()

const senpUiModules = import.meta.glob('~~/node_modules/senp-ui/src/runtime/**/*', { as: 'raw' })
const localModules = import.meta.glob('~/**/*', { as: 'raw' })

const content = ref(props.value || '')
onMounted(() => {
  console.log({ senpUiModules, localModules })
  if (props.path) {
    import(/* @vite-ignore */ props.path)
      .then((v) => {
        console.log(v)
        content.value = v
      })
      .catch((err) => {
        console.log(err)
        content.value = err
      })
    return
  }
  if (props.localModuleContains) {
    Object.entries(localModules)
      .find(([key, value]) => key.includes(props.localModuleContains!))?.[1]()
      .then((val) => {
        console.log(val)
        content.value = val + ''
      })
      .catch((err) => {
        console.log({ err })
      })
  }
  if (props.senpUiModuleContains) {
    Object.entries(senpUiModules)
      .find(([key, value]) => key.includes(props.senpUiModuleContains!))?.[1]()
      .then((val) => {
        console.log(val)
        content.value = val + ''
      })
      .catch((err) => {
        console.log({ err })
      })
  }
})
</script>
