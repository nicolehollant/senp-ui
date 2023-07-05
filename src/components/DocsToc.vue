<template>
  <aside>
    <p class="text-sm mb-4 text-gray-200">Table Of Contents</p>
    <ul id="senp-ui-docs-toc">
      <DocsTocEntry v-for="link in value.links" :value="link"></DocsTocEntry>
    </ul>
  </aside>
</template>

<script setup lang="ts">
type TocEntry = {
  id: string
  depth: number
  text: string
} & { children?: TocEntry[] }
defineProps<{
  value: {
    title: string
    searchDepth: number
    depth: number
    links: TocEntry[]
  }
}>()

const observer = ref<IntersectionObserver>()
onMounted(() => {
  nextTick(() => {
    nextTick(() => {
      observer.value = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id')
          if (entry.intersectionRatio > 0) {
            document.querySelector(`#senp-ui-docs-toc a[href="#${id}"]`)?.classList?.add?.('active')
          } else {
            document.querySelector(`#senp-ui-docs-toc a[href="#${id}"]`)?.classList?.remove?.('active')
          }
        })
      })
      // observer.value.observe(target)
      document.querySelectorAll('h1[id], h2[id], h3[id], h4[id]').forEach((section) => {
        observer.value!.observe(section)
      })
    })
  })
})
</script>
