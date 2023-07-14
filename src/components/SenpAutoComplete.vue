<template>
  <HeadlessCombobox
    v-bind="$attrs"
    :model-value="modelValue"
    @update:model-value="(e) => $emit('update:modelValue', e)"
  >
    <div class="relative mt-1">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg bg-gray-800 text-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
      >
        <HeadlessComboboxInput
          class="w-full bg-transparent border-none py-2 pl-3 pr-10 text-sm leading-5 focus:ring-0"
          :displayValue="displayValue"
          @change="
            (e) => {
              query = e.target.value
              debounceUpdate()
            }
          "
        />
        <HeadlessComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
          <Icon name="mdi:chevron-down" class="h-5 w-5 text-gray-400" />
        </HeadlessComboboxButton>
      </div>
      <HeadlessTransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
        <HeadlessComboboxOptions
          @after-leave="query = ''"
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <div
            v-if="filteredOptions.length === 0 && query !== ''"
            class="relative cursor-default select-none py-2 px-4 text-gray-400"
          >
            Nothing found.
          </div>
          <template v-for="(option, i) in filteredOptions">
            <HeadlessComboboxOption v-slot="{ selected, active }" :value="option">
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-blue-600 text-white': active,
                  'text-gray-200': !active,
                }"
              >
                <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                  <slot>{{ typeof option === 'string' ? option : option.label ?? option.value }}</slot>
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-blue-300': !active }"
                >
                  <Icon name="mdi:check" class="h-5 w-5" />
                </span>
              </li>
            </HeadlessComboboxOption>
          </template>
        </HeadlessComboboxOptions>
      </HeadlessTransitionRoot>
    </div>
  </HeadlessCombobox>
</template>

<script setup lang="ts">
import Fuse from 'fuse.js'
import { useDebounceFn as debounce } from '@vueuse/core'
const props = withDefaults(
  defineProps<{
    /**
     * model for autocomplete
     */
    modelValue: { label: string; value: any }
    /**
     * list of options
     */
    options: { label: string; value: any }[]
    /**
     * fields to search on
     */
    keyFields?: string[]
    /**
     * function to display a value based on the selected value
     */
    displayValue?: (v: any) => string
    /**
     * - sort: include all items sorted by priority
     * - filter: include items within a threshold
     */
    mode?: 'filter' | 'sort'
  }>(),
  {
    keyFields: () => ['label'],
    mode: 'filter',
    displayValue: (v: any) => v.label,
  }
)
defineEmits<{
  (event: 'update:modelValue', value: { label: string; value: any }): void
}>()

const query = ref('')

const fuse = new Fuse(props.options, {
  includeScore: true,
  keys: props.keyFields,
  findAllMatches: props.mode === 'sort',
  threshold: props.mode === 'sort' ? 1 : 0.6,
})

const filter = () => {
  if (!query.value) {
    filteredOptions.value = props.options
  } else {
    filteredOptions.value = fuse.search(query.value).map((a) => a.item) || []
  }
}

const debounceUpdate = debounce(filter, 400)

const filteredOptions = ref(props.options)
</script>
