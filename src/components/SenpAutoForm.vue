<template>
  <form
    v-bind="$attrs"
    @submit.prevent="submit"
    class="grid gap-y-2 gap-x-4"
    :class="{
      'grid-cols-1': columns === '1',
      'grid-cols-2': columns === '2',
      'grid-cols-3': columns === '3',
      'grid-cols-4': columns === '4',
      'grid-cols-5': columns === '5',
      'grid-cols-6': columns === '6',
      'grid-cols-8': columns === '8',
      'grid-cols-12': columns === '12',
    }"
  >
    <template v-for="(input, index) in state">
      <p v-if="input.type === 'description'" class="py-2" :style="columnSpan(input, 'all')">
        {{ input.text }}
      </p>
      <div
        :class="{ 'py-4': input.style === 'line', 'py-2': input.style === 'space' }"
        v-else-if="input.type === 'separator'"
        :style="columnSpan(input, 'all')"
      >
        <hr class="border-gray-700" v-if="input.style === 'line'" />
      </div>
      <template v-else-if="input.type === 'custom'">
        <slot :name="input.slotName"></slot>
      </template>
      <SenpTextInput
        v-else-if="input.type === 'text'"
        v-model="(state[index] as FormInput).value"
        :type="input.inputType || 'text'"
        :label="input.label"
        :hint="input.hint"
        :error="input.error"
        :style="columnSpan(input)"
      ></SenpTextInput>
      <SenpSelect
        v-else-if="input.type === 'select'"
        v-model="(state[index] as FormInput).value"
        :options="input.options"
        :label="input.label"
        :hint="input.hint"
        :error="input.error"
        :style="columnSpan(input)"
      ></SenpSelect>
      <SenpCheckbox
        v-else-if="input.type === 'checkbox'"
        v-model="(state[index] as FormInput).value"
        :label="input.label"
        :label-side="input.labelSide ?? 'top'"
        size="input"
        :hint="input.hint"
        :error="input.error"
        :style="columnSpan(input)"
      ></SenpCheckbox>
    </template>
    <slot name="submit" :submit="submit">
      <SenpButton class="mt-2">Submit</SenpButton>
    </slot>
  </form>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'

type FormInput =
  | {
      type: 'textinput'
      key?: string
      inputType?: string
      validator?: () => void
      value: string
      label?: string
      hint?: string
      error?: string
      columnSpan?: number | 'all'
    }
  | {
      type: 'select'
      key?: string
      validator?: () => void
      value: any
      options: { label?: string; value: any }[] | string[]
      label?: string
      hint?: string
      error?: string
      columnSpan?: number | 'all'
    }
  | {
      type: 'checkbox'
      key?: string
      validator?: () => void
      value: any
      label?: string
      labelSide?: 'top' | 'left' | 'right'
      hint?: string
      error?: string
      columnSpan?: number | 'all'
    }
const props = withDefaults(
  defineProps<{
    columns?: '1' | '2' | '3' | '4' | '5' | '6' | '8' | '12'
    defaultColumnSpan?: 'all' | number
    localStorageKey?: string
    modelValue: (
      | {
          type: 'description'
          text: string
          columnSpan?: number | 'all'
        }
      | {
          type: 'custom'
          slotName: string
        }
      | {
          type: 'separator'
          style: 'line' | 'space'
          columnSpan?: number | 'all'
        }
      | {
          type: 'text'
          key: string
          inputType?: string
          validator?: () => void
          value: string
          label?: string
          hint?: string
          error?: string
          columnSpan?: number | 'all'
        }
      | {
          type: 'select'
          key: string
          validator?: () => void
          value: any
          options: { label?: string; value: any }[] | string[]
          label?: string
          hint?: string
          error?: string
          columnSpan?: number | 'all'
        }
      | {
          type: 'checkbox'
          key?: string
          validator?: () => void
          value: any
          label?: string
          labelSide?: 'top' | 'left' | 'right'
          hint?: string
          error?: string
          columnSpan?: number | 'all'
        }
    )[]
  }>(),
  {
    columns: '1',
    defaultColumnSpan: 'all',
  }
)
const emit = defineEmits<{
  (event: 'submit', value: (typeof props)['modelValue']): void
  (event: 'submit:object', value: { [k: string]: any }): void
}>()

const state = ref(JSON.parse(JSON.stringify(props.modelValue)))
onMounted(() => {
  if (props.localStorageKey) {
    useLocalStorage(props.localStorageKey ?? '__autoform', state, {
      mergeDefaults: true,
    })
  }
})

const columnSpan = (input: { columnSpan?: number | 'all' }, defaultSpan: number | 'all' = props.defaultColumnSpan) => {
  return {
    gridColumn:
      (input.columnSpan ?? defaultSpan) === 'all' ? '1 / -1' : `span ${input.columnSpan} / span ${input.columnSpan}`,
  }
}

const submit = () => {
  emit('submit', state.value)
  emit(
    'submit:object',
    Object.fromEntries(
      state.value.filter((a: any) => a?.value !== undefined).map((a: any) => [a.key ?? a.label, a.value])
    )
  )
}
</script>
