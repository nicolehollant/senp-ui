<template>
  <component :is="compiled" :state="state" ref="compiledRef" />
</template>

<script setup lang="ts">
import { compile } from 'vue'

const content = ref('')
const state = ref({})
const stateStr = ref('')
const compiled = ref<any>('div')

const _compile = () => {
  try {
    const component = compile(content.value)
    compiled.value = component
  } catch (error) {
    compiled.value = 'div'
  }
}

onMounted(() => {
  const stored = localStorage.getItem('playgroundTemplate')
  const storedState = localStorage.getItem('playgroundState')
  content.value = stored ?? ''
  stateStr.value = storedState ?? ''
  try {
    state.value = JSON.parse(storedState ?? '{ "testing": [1, 2, 3]}')
  } catch (error) {
    state.value = {
      testing: [1, 2, 3],
    }
  }
  _compile()
  setInterval(() => {
    const stored = localStorage.getItem('playgroundTemplate')
    const storedState = localStorage.getItem('playgroundState')
    if (stateStr.value && stateStr.value !== storedState) {
      stateStr.value = storedState ?? ''
      try {
        state.value = JSON.parse(storedState ?? '{ "testing": [1, 2, 3]}')
      } catch (error) {
        state.value = {
          testing: [1, 2, 3],
        }
      }
    }
    if (stored !== content.value) {
      content.value = stored ?? ''
      _compile()
    }
  }, 2000)
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
