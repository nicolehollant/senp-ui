<template>
  <template v-if="typeOfValue === 'object'">
    <SenpHljsHighlight
      v-if="renderStyleFromDotPath?.type === 'code'"
      theme="gh-dark"
      autodetect
      language="json"
      :value="JSON.stringify(value, null, 2)"
    ></SenpHljsHighlight>
    <details
      v-else-if="renderStyleFromDotPath?.type === 'expandable'"
      class="gap-2 p-4 rounded-xl text-gray-500 bg-gray-800/30"
    >
      <summary class="">
        <p class="ml-2 inline text-white">
          {{ (renderStyleFromDotPath as any)?.label ?? 'see more' }}
        </p>
      </summary>
      <div class="flex flex-col gap-2 pt-4 text-white">
        <div v-for="(val, key, index) in value">
          <p class="text-xs text-gray-400 font-medium tracking-wider mb-1">{{ key }}</p>
          <SenpAutoJson
            :parent-key="[parentKey, key].join('.')"
            :root-value="rootValue ?? value"
            :render-as="renderAs"
            :value="(val as JSONValue)"
          ></SenpAutoJson>
        </div>
      </div>
    </details>
    <div v-else class="flex flex-col gap-2 p-4 rounded-xl bg-gray-800/30">
      <div v-for="(val, key, index) in value">
        <p class="text-xs text-gray-400 font-medium tracking-wider mb-1">{{ key }}</p>
        <SenpAutoJson
          :parent-key="[parentKey, key].join('.')"
          :root-value="rootValue ?? value"
          :render-as="renderAs"
          :value="(val as JSONValue)"
        ></SenpAutoJson>
      </div>
    </div>
  </template>
  <template v-else-if="typeOfValue === 'array'">
    <SenpHljsHighlight
      v-if="renderStyleFromDotPath?.type === 'code'"
      theme="gh-dark"
      autodetect
      language="json"
      :value="JSON.stringify(value, null, 2)"
    ></SenpHljsHighlight>
    <div
      v-else
      class="rounded-xl gap-3"
      :style="{
        gridTemplateColumns: `repeat(${(renderStyleFromDotPath as any)?.columns ?? (value as any[]).length}, minmax(0, 1fr))`
      }"
      :class="{
        'flex flex-wrap': renderStyleFromDotPath?.type === 'row',
        'flex flex-col': renderStyleFromDotPath?.type === 'col',
        grid: renderStyleFromDotPath?.type === 'grid',
      }"
    >
      <div v-for="(val, index) in value" class="bg-slate-700/30 rounded-xl p-2 px-4">
        <SenpAutoJson
          :parent-key="[parentKey, index].join('.')"
          :root-value="rootValue ?? value"
          :render-as="renderAs"
          :value="(val as JSONValue)"
        ></SenpAutoJson>
      </div>
    </div>
  </template>
  <template v-else>
    <SenpHljsHighlight
      v-if="renderStyleFromDotPath?.type === 'code'"
      theme="gh-dark"
      autodetect
      language="javascript"
      :value="value + ''"
    ></SenpHljsHighlight>
    <img
      :src="value + ''"
      v-else-if="renderStyleFromDotPath?.type === 'image'"
      class="rounded-lg"
      :style="{
      width: (renderStyleFromDotPath as any)?.width ?? 'auto',
      height: (renderStyleFromDotPath as any)?.height ?? 'auto',
    }"
    />
    <a
      :href="value + ''"
      target="_blank"
      rel="noopener noreferrer"
      v-else-if="renderStyleFromDotPath?.type === 'link'"
      class="break-all text-blue-200 underline"
      >{{ value }}</a
    >
    <div v-else class="break-all">{{ value }}</div>
  </template>
</template>

<script setup lang="ts">
import { JSONValue } from '../composables/request'

type AutoJsonRenderObjectOption = { type: 'card' } | { type: 'expandable'; label: string } | { type: 'code' }
type AutoJsonRenderArrayOption =
  | { type: 'row' }
  | { type: 'col' }
  | { type: 'grid'; columns?: number }
  | { type: 'code' }
type AutoJsonRenderPrimitiveOption =
  | { type: 'text' }
  | { type: 'image'; width?: string; height?: string }
  | { type: 'code' }
  | { type: 'link' }
type AutoJsonRenderOption = AutoJsonRenderObjectOption | AutoJsonRenderArrayOption | AutoJsonRenderPrimitiveOption

const props = withDefaults(
  defineProps<{
    value: JSONValue
    nestLevel?: number
    rootValue?: JSONValue
    parentKey?: string
    renderAs?: {
      [dotpath: string]: AutoJsonRenderOption
    }
  }>(),
  {
    parentKey: '',
    value: null,
    nestLevel: 1,
  }
)

const styles = {
  object: {
    default: { type: 'card' },
    available: ['card', 'expandable', 'code'],
  },
  array: {
    default: { type: 'row' },
    available: ['row', 'col', 'grid', 'code'],
  },
  primitive: {
    default: { type: 'text' },
    available: ['text', 'image', 'code', 'link'],
  },
}

const renderStyleFromDotPath = computed(() => {
  // 'a.b.etc'.split('.').reduce((o,i)=> o[i], obj)
  try {
    if (!props.renderAs) {
      return styles[typeOfValue.value].default
    }
    const renderAsStyle = props.renderAs[props.parentKey.slice(1)]
    if (renderAsStyle && styles[typeOfValue.value].available.includes(renderAsStyle.type)) {
      return renderAsStyle
    }
    if (props.parentKey.split('.').some((part) => !isNaN(Number(part)))) {
      const replaced = props.parentKey
        .split('.')
        .map((part) => (part && !isNaN(Number(part)) ? '[$]' : part))
        .join('.')
        .slice(1)
      const renderAsSlicedStyle = props.renderAs[replaced]
      if (renderAsSlicedStyle && styles[typeOfValue.value].available.includes(renderAsSlicedStyle.type)) {
        return renderAsSlicedStyle
      }
    }
    return styles[typeOfValue.value].default
  } catch (error) {
    return styles[typeOfValue.value].default
  }
})

const getTypeOfValue = (value: JSONValue) => {
  if (Array.isArray(value)) {
    return 'array'
  }
  if (typeof value === 'object') {
    return 'object'
  }
  return 'primitive'
}

const typeOfValue = computed(() => {
  return getTypeOfValue(props.value)
})
</script>
