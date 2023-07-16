<template>
  <HeadlessMenu
    as="div"
    class="relative inline-block text-left"
  >
    <div>
      <HeadlessMenuButton v-slot="{ open }">
        <slot
          name="trigger"
          :open="open"
        />
      </HeadlessMenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-75 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-75 opacity-0"
    >
      <HeadlessMenuItems
        :class="{
          'left-0 origin-top-left': side === 'left',
          'left-1/2 transform -translate-x-1/2 origin-top': side === 'center',
          'right-0 origin-top-right': side === 'right',
        }"
        class="absolute mt-2 w-56 rounded-md bg-gray-800 shadow-lg ring-1 ring-gray-500 ring-opacity-60 focus:outline-none"
      >
        <div class="px-1 py-1">
          <slot name="items">
            <HeadlessMenuItem
              v-for="option in options"
              v-slot="{ active }"
              :key="option.label"
            >
              <button
                :class="[
                  active ? 'bg-blue-700/50 text-white' : 'text-gray-200',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                @click="$emit('select', option.emits)"
              >
                {{ option.label }}
              </button>
            </HeadlessMenuItem>
          </slot>
        </div>
      </HeadlessMenuItems>
    </transition>
  </HeadlessMenu>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    options?: { label: string; emits: string }[]
    side?: 'right' | 'left' | 'center'
  }>(),
  {
    side: 'right',
  }
)
defineEmits<{
  (event: 'select', key: string): void
}>()
</script>
