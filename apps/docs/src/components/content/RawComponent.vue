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
  language: '' | 'vue' | 'javascript' | 'python' | 'vue-html' | 'html' | 'typescript' | 'json' | 'bash'
}>()

const content = ref(props.value || '')

onMounted(() => {
  try {
    if (props.localModuleContains || props.senpUiModuleContains) {
      $fetch('/api/getRawContent', {
        query: {
          localModuleContains: props.localModuleContains,
          senpUiModuleContains: props.senpUiModuleContains,
        },
      }).then((data: any) => {
        if (data?.value) {
          content.value = data.value
        }
      })
    }
  } catch (error) {
    console.log('failed to load globs? idk')
  }
})
</script>
