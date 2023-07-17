<template>
  <SenpLayoutBasic
    fixed-header
    :classes="{
      header: {
        extend: 'text-2xl bg-gray-950/70 bg-gradient-to-r from-gray-950/50 to-gray-900/50 backdrop-blur',
      },
      content: {
        extend: 'max-w-4xl w-full mx-auto !py-12',
      },
      footer: {
        extend: 'hidden',
      },
    }"
  >
    <template #header>
      <div class="px-4 font-medium flex items-center gap-3 max-w-4xl w-full m-auto h-16">
        <p class="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-teal-700 text-4xl">🎨</p>
        <p>SenpUI</p>
      </div>
    </template>

    <template #content>
      <p>SenpUI is a beautifully designed component library for Nuxt 3</p>
      <nav>
        <div class="flex items-center gap-2">
          <NuxtLink class="block" to="/docs"><SenpButton>Docs</SenpButton></NuxtLink>
          <NuxtLink class="block" to="/playground/edit"><SenpButton>Playground</SenpButton></NuxtLink>
        </div>
        <h2 class="mt-12 mb-8 text-2xl">Examples</h2>
        <ul class="flex flex-wrap gap-2 items-center">
          <NuxtLink to="/examples/auto-complete"><SenpButton>auto-complete</SenpButton></NuxtLink>
          <NuxtLink to="/examples/auto-form"><SenpButton>auto-form</SenpButton></NuxtLink>
          <NuxtLink to="/examples/auto-json"><SenpButton>auto-json</SenpButton></NuxtLink>
          <NuxtLink to="/examples/data-view-moview"><SenpButton>data-view-moview</SenpButton></NuxtLink>
          <NuxtLink to="/examples/data-view"><SenpButton>data-view</SenpButton></NuxtLink>
          <NuxtLink to="/examples/editor"><SenpButton>editor</SenpButton></NuxtLink>
          <NuxtLink to="/examples/fixed-sidebar/fixed-head"><SenpButton>fixed-sidebar/fixed-head</SenpButton></NuxtLink>
          <NuxtLink to="/examples/hljs-highlight"><SenpButton>hljs-highlight</SenpButton></NuxtLink>
          <NuxtLink to="/examples/library"><SenpButton>library</SenpButton></NuxtLink>
          <NuxtLink to="/examples/prism-highlight"><SenpButton>prism-highlight</SenpButton></NuxtLink>
          <NuxtLink to="/examples/senp-rest-playground"><SenpButton>senp-rest-playground</SenpButton></NuxtLink>
          <NuxtLink to="/examples/toast"><SenpButton>toast</SenpButton></NuxtLink>
          <NuxtLink to="/examples/virtual-scroller"><SenpButton>virtual-scroller</SenpButton></NuxtLink>
        </ul>
      </nav>
    </template>
  </SenpLayoutBasic>
</template>
