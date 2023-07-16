<template>
  <SenpLayoutBasic
    fixed-header
    :classes="{
      header: {
        extend: 'text-2xl bg-black/70 bg-gradient-to-r from-black/50 to-neutral-900/50 backdrop-blur',
      },
      content: {
        extend: 'max-w-3xl w-full mx-auto !py-12',
      },
      footer: {
        extend: 'hidden',
      },
    }"
  >
    <template #header>
      <div
        class="px-4 sm:px-6 lg:px-8 font-medium flex items-center gap-3 max-w-3xl w-full m-auto border-b border-neutral-700"
      >
        <p class="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-teal-700 text-4xl">
          🎨
        </p>
        <p>SenpUI</p>
      </div>
    </template>

    <template #content>
      <p>
        Senp-ui is a simple component library for nuxt3 with the intention of being used via
        <code class="text-blue-300 font-semibold">nuxt extends</code>
      </p>
      <div class="flex flex-wrap gap-2 items-center justify-center">
        <NuxtLink to="/examples/auto-complete">
          <SenpButton>auto-complete</SenpButton>
        </NuxtLink>
        <NuxtLink to="/examples/auto-form">
          <SenpButton>auto-form</SenpButton>
        </NuxtLink>
        <NuxtLink to="/examples/auto-json">
          <SenpButton>auto-json</SenpButton>
        </NuxtLink>
        <NuxtLink to="/examples/data-view-moview">
          <SenpButton>data-view-moview</SenpButton>
        </NuxtLink>
        <NuxtLink to="/examples/data-view">
          <SenpButton>data-view</SenpButton>
        </NuxtLink>
        <NuxtLink to="/examples/editor">
          <SenpButton>editor</SenpButton>
        </NuxtLink>
        <NuxtLink to="/examples/fixed-sidebar/fixed-head">
          <SenpButton>fixed-sidebar/fixed-head</SenpButton>
        </NuxtLink>
        <NuxtLink to="/examples/hljs-highlight">
          <SenpButton>hljs-highlight</SenpButton>
        </NuxtLink>
        <NuxtLink to="/examples/library">
          <SenpButton>library</SenpButton>
        </NuxtLink>
        <NuxtLink to="/examples/prism-highlight">
          <SenpButton>prism-highlight</SenpButton>
        </NuxtLink>
        <NuxtLink to="/examples/senp-rest-playground">
          <SenpButton>senp-rest-playground</SenpButton>
        </NuxtLink>
        <NuxtLink to="/examples/toast">
          <SenpButton>toast</SenpButton>
        </NuxtLink>
        <NuxtLink to="/examples/virtual-scroller">
          <SenpButton>virtual-scroller</SenpButton>
        </NuxtLink>
      </div>
    </template>
  </SenpLayoutBasic>
</template>
