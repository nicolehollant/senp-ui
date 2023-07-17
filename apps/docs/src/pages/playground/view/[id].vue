<template>
  <component :is="compiled" :state="state" ref="compiledRef" />
</template>

<script setup lang="ts">
import { compile } from 'vue'

const content = ref('')
const state = ref({})
const compiled = ref<any>('div')

const _compile = () => {
  try {
    const component = compile(content.value)
    compiled.value = component
  } catch (error) {
    compiled.value = 'div'
  }
}

const route = useRoute()

const load = async () => {
  let result
  try {
    ;[result] = await playgroundApi.match({ slug: route.params.id + '' })
  } catch (error) {
    result = await playgroundApi.getOneByID(route.params.id + '')
  }
  content.value = result.template
  state.value = result.state
  _compile()
}
onMounted(() => {
  load()
})

useHead({
  script: [
    {
      src: 'https://cdn.tailwindcss.com',
    },
  ],
})
</script>

<style scoped>
body,
html,
#__nuxt {
  @apply bg-black text-white overflow-auto !bg-none;
}
</style>
