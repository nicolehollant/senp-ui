<template>
  <HeadlessListbox
    v-slot="{ open }"
    :value="modelValue"
    @update:modelValue="(v: any) => $emit('update:modelValue', v)"
  >
    <div class="relative">
      <HeadlessListboxButton
        class="relative w-full cursor-default border border-gray-700 rounded-lg bg-gray-800 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500 sm:text-sm"
      >
        <slot name="trigger">
          <span class="block truncate">{{ modelValue || placeholder }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <Icon
              name="mdi:chevron-down"
              :class="{ 'scale-y-[-1]': open }"
              class="h-5 w-5 text-gray-400 transform transition"
              aria-hidden="true"
            />
          </span>
        </slot>
      </HeadlessListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <HeadlessListboxOptions
          class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 text-base shadow-lg ring-1 ring-gray-700 ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <HeadlessListboxOption
            v-for="option in options"
            v-slot="{ active, selected }"
            :key="option"
            :value="option"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-blue-800 text-blue-200' : 'text-gray-200',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]"
            >
              <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{ option }}</span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600"
              >
                <Icon
                  name="mdi:check"
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </span>
            </li>
          </HeadlessListboxOption>
        </HeadlessListboxOptions>
      </transition>
    </div>
  </HeadlessListbox>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string
    label?: string
    placeholder?: string
    options?: string[]
  }>(),
  {
    placeholder: '-- Select one --',
  }
)
defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()
</script>
