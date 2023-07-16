<template>
  <SenpLayoutBasic
    fixed-header
    :classes="{
      header: {
        extend: 'bg-black/20 backdrop-blur shadow',
      },
    }"
  >
    <template #header>
      <h1 class="text-2xl">Library</h1>
    </template>
    <template #content>
      <SenpCard type="header" title="SenpPrismHighlight">
        <SenpPrismHighlight
          title="SampleTS.ts"
          class="bg-black/20"
          language="typescript"
          theme="shades-of-purple"
          :value="tsValue"
        ></SenpPrismHighlight>
      </SenpCard>
      <SenpCard type="header" title="SenpButton">
        <SenpButton>Hello World!</SenpButton>
        <SenpButton theme="secondary">Hello World!</SenpButton>
        <SenpButton theme="tertiary">Hello World!</SenpButton>
      </SenpCard>
      <SenpCard type="header" title="Tags">
        <SenpTag theme="primary">Hello World</SenpTag>
        <SenpTag theme="success">Hello World</SenpTag>
        <SenpTag theme="neutral">Hello World</SenpTag>
        <SenpTag theme="error">Hello World</SenpTag>
      </SenpCard>
    </template>
  </SenpLayoutBasic>
</template>

<script setup lang="ts">
const count = ref(0)
const tsValue = `const jsonValue = [
  {
    status: 'In Progress',
    created: '2023-01-11T22:39:16.743Z',
    assigned: 'Bessie Hayes',
    description:
      'Dignissimos atque distinctio blanditiis. Nesciunt sit molestias atque quis exercitationem. Et excepturi assumenda nisi voluptates occaecati veritatis eligendi in cum.',
  }
]`
</script>
