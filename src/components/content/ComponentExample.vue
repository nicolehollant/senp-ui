<template>
  <section :class="$cx(styles.container({ prose: !notProse, bottomSpace }))">
    <div v-if="propControls.length" :class="$cx(styles.controls({ background: controlsBg, prose: !notProse }))">
      <div
        v-for="prop in propControls"
        :key="prop.key"
        class="flex shrink-0 flex-col gap-0.5 px-4 py-2 justify-between"
      >
        <label :for="`prop-${prop.key}`" class="block text-xs font-medium text-gray-400 dark:text-gray-500 px-1">{{
          prop.label
        }}</label>
        <SenpCheckbox
          v-if="prop.type === 'boolean'"
          v-model="componentProps[prop.key]"
          size="input"
          :name="`prop-${prop?.label ?? prop.key}`"
        />
        <SenpSelect
          v-else-if="prop.type === 'string' && prop.options?.length"
          v-model="componentProps[prop.key]"
          :options="prop.options"
          :classes="{ input: { extend: 'min-w-[6rem] !w-[calc(100%+1.5rem)]' } }"
          :name="`prop-${prop?.label ?? props.key}`"
        />
        <SenpTextInput
          v-else-if="prop.type === 'object'"
          :model-value="
            typeof componentProps[prop.key] === 'string'
              ? componentProps[prop.key]
              : JSON.stringify(componentProps[prop.key])
          "
          :name="`prop-${prop?.label ?? props.key}`"
          autocomplete="off"
          @update:model-value="(val) => (componentProps[prop.key] = tryParseOrDefault(val, val))"
        />
        <SenpTextInput
          v-else
          :model-value="componentProps[prop.key]"
          :type="prop.type === 'number' ? 'number' : 'text'"
          :name="`prop-${prop?.label ?? props.key}`"
          autocomplete="off"
          @update:model-value="(val) => (componentProps[prop.key] = prop.type === 'number' ? Number(val) : val)"
        />
      </div>
    </div>
    <div :class="$cx(styles.canvas({ background: canvasBg, prose: !notProse }))">
      <component v-if="ignoreModel" :is="is" v-bind="fullProps">
        <ContentSlot v-if="$slots.default" :use="$slots.default" unwrap="p" />
        <template v-for="slot in Array.isArray(slots) ? slots : Object.keys(slots || {})" :key="slot" #[slot]>
          <ClientOnly>
            <ContentSlot v-if="$slots[slot]" :use="$slots[slot]" />
          </ClientOnly>
        </template>
      </component>
      <component v-else :is="is" v-model="vModel" v-bind="fullProps">
        <ContentSlot v-if="$slots.default" :use="$slots.default" unwrap="p" />
        <template v-for="slot in Array.isArray(slots) ? slots : Object.keys(slots || {})" :key="slot" #[slot]>
          <ClientOnly>
            <ContentSlot v-if="$slots[slot]" :use="$slots[slot]" />
          </ClientOnly>
        </template>
      </component>
    </div>
    <div v-if="!noCode" :class="$cx(styles.code({ prose: !notProse, background: codeBg }))">
      <ContentSlot v-if="$slots.code" :use="$slots.code"></ContentSlot>
      <ContentRenderer v-else-if="!previewOnly" :value="(ast as any)" class="[&>div>pre]:!rounded-t-none" />
    </div>
  </section>
</template>

<script setup lang="ts">
// @ts-expect-error
import { transformContent } from '@nuxt/content/transformers'
import { cva } from 'class-variance-authority'
import dedent from 'dedent'
import { tryParseOrDefault } from '../../utils/tryParse'

const props = withDefaults(
  defineProps<{
    is: string
    notProse?: boolean
    canvasBg?: 'transparent' | 'dark' | 'light' | 'medium'
    codeBg?: 'transparent' | 'dark' | 'light' | 'medium'
    controlsBg?: 'transparent' | 'dark' | 'light' | 'medium'
    noCode?: boolean
    baseProps?: Record<string, any>
    props?: Record<string, any>
    ignoreProps?: string[]
    ignoreModel?: boolean
    controls?: Record<
      string,
      {
        type: 'string' | 'boolean' | 'menu' | 'number'
        label?: string
        key?: string
        options?: any[]
      }
    >
    slots?: object
    defaultSlotContent?: string
    bottomSpace?: boolean
    previewOnly?: boolean
    componentClass?: string
  }>(),
  {
    notProse: true,
    canvasBg: 'transparent',
    codeBg: 'dark',
    controlsBg: 'dark',
    noCode: false,
    bottomSpace: true,
    ignoreProps: () => [],
    controls: () => ({}),
    propCode: () => '',
    previewOnly: false,
    componentClass: '',
    ignoreModel: false,
  }
)

const baseProps = reactive({ ...props.baseProps })
const componentProps = reactive({ ...props.props })
const fullProps = computed(() => ({
  ...baseProps,
  ...componentProps,
  ...(props.componentClass ? { class: props.componentClass } : {}),
}))
const vModel = computed({
  get: () => baseProps.modelValue,
  set: (value) => {
    baseProps.modelValue = value
  },
})
const codePreview = computed(() => {
  const propStr = Object.entries(fullProps.value)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}="${value}"`
      }
      if (key.startsWith('v-')) {
        return `${key}="${JSON.stringify(value).replaceAll('"', "'")}"`
      }
      return `:${key}="${JSON.stringify(value).replaceAll('"', "'")}"`
    })
    .filter(Boolean)
    .join(' ')
  const defaultSlotContent = props.defaultSlotContent ?? ''
  const slots = props.slots
    ? Object.entries(props.slots)
        .map(([slot, content]) => `  <template #${slot}>${content}</template>`)
        .join('\n')
    : ''
  const slotContent =
    !defaultSlotContent && !slots
      ? ' />'
      : `>` + (defaultSlotContent ? `\n  ${defaultSlotContent}` : '') + slots + `\n</${props.is}>`
  return `\`\`\`vue
<${[props.is, propStr].filter(Boolean).join(' ')}${slotContent}
  \`\`\``
})
const { data: ast } = await useAsyncData(
  `${name}-ast-${JSON.stringify(props)}`,
  () =>
    transformContent('content:_markdown.md', codePreview.value, {
      highlight: {
        theme: 'github-dark',
      },
    }),
  { watch: [codePreview] }
)

const propControls = computed(
  () =>
    Object.keys(componentProps)
      .map((key) => {
        if (props.ignoreProps.includes(key)) {
          return null
        }
        if (key in props.controls) {
          return {
            ...props.controls[key],
            label: props.controls[key].label ?? key,
            key: props.controls[key].key ?? key,
          }
        }
        const type =
          typeof componentProps[key] === 'number'
            ? 'number'
            : typeof componentProps[key] === 'boolean'
            ? 'boolean'
            : typeof componentProps[key] === 'string'
            ? 'string'
            : typeof componentProps[key] === 'object' && componentProps[key] != null
            ? 'object'
            : 'string'
        return {
          type,
          label: key,
          key: key,
          options: [],
        }
      })
      .filter(Boolean) as (
      | {
          label: string
          key: string
          type: 'string' | 'boolean' | 'menu' | 'number' | 'object'
          options?: any[] | undefined
        }
      | {
          type: string
          label: string
          key: string
          options: never[]
        }
    )[]
)

const styles = {
  container: cva(
    'border border-gray-300 dark:border-gray-700 rounded-lg divide-y divide-gray-300 dark:divide-gray-700',
    {
      variants: {
        prose: { false: 'not-prose', true: 'prose' },
        bottomSpace: { false: '', true: 'mb-8' },
      },
    }
  ),
  canvas: cva('px-4 py-8', {
    variants: {
      prose: { false: 'not-prose', true: 'prose' },
      background: { transparent: 'bg-transparent', dark: 'bg-gray-900', light: 'bg-gray-100', medium: 'bg-gray-500' },
    },
  }),
  code: cva('p-4 overflow-auto rounded-b-lg text-xs', {
    variants: {
      prose: { false: 'not-prose', true: 'prose' },
      background: { transparent: 'bg-transparent', dark: 'bg-gray-900', light: 'bg-gray-100', medium: 'bg-gray-500' },
    },
  }),
  controls: cva('flex divide-x divide-gray-300 dark:divide-gray-700 max-w-full overflow-auto rounded-t-lg', {
    variants: {
      prose: { false: 'not-prose', true: 'prose' },
      background: { transparent: 'bg-transparent', dark: 'bg-gray-900', light: 'bg-gray-100', medium: 'bg-gray-500' },
    },
  }),
}
</script>

<!-- 

::ComponentExample
---
is: SenpButton
props:
  label: Hello World
  labelA: Hello World
  labelB: false
  labelC: Hello World
  labelD: Hello World
  labelE: Hello World
  labelF: Hello World
controls:
  label:
    type: string
    options: 
    - Hello World
    - Bounjour Monde
    - Hola Mondo
---
  
#code
```html
<SenpButton>Hello world</SenpButton>
```
::

 -->
