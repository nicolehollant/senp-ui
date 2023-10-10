<template>
  <SenpCard>
    <SenpTab v-model="mode" :options="['npm', 'yarn', 'pnpm']" v-slot="{ active }">
      <SenpHighlight
        v-if="active === 'npm'"
        :value="valueMap.npm"
        class="bg-gray-950 not-prose"
        :classes="{ code: { base: '!text-sm !bg-transparent !p-3 overflow-auto' } }"
        language="bash"
        theme="nord"
      ></SenpHighlight>
      <SenpHighlight
        v-if="active === 'yarn'"
        :value="valueMap.yarn"
        class="bg-gray-950 not-prose"
        :classes="{ code: { base: '!text-sm !bg-transparent !p-3 overflow-auto' } }"
        language="bash"
        theme="nord"
      ></SenpHighlight>
      <SenpHighlight
        v-if="active === 'pnpm'"
        :value="valueMap.pnpm"
        class="bg-gray-950 not-prose"
        :classes="{ code: { base: '!text-sm !bg-transparent !p-3 overflow-auto' } }"
        language="bash"
        theme="nord"
      ></SenpHighlight>
    </SenpTab>
  </SenpCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    dependencies: string
    type?: 'dependency' | 'devDependency'
  }>(),
  {
    type: 'dependency',
  }
)

const mode = ref('npm' as 'npm' | 'yarn' | 'pnpm')

const valueMap = computed(() => {
  return {
    npm: `npm i ${props.type === 'dependency' ? '' : '-D'}${props.dependencies}`,
    yarn: `yarn add ${props.type === 'dependency' ? '' : '-D'}${props.dependencies}`,
    pnpm: `pnpm add ${props.type === 'dependency' ? '' : '-D'}${props.dependencies}`,
  }
})
</script>
