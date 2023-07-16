<template>
  <li
    v-if="value.text"
    class="text-sm py-0.5 transition duration-200 hover:!text-purple-500"
    :class="{
      '!text-blue-500 [&:has(.active)]:!border-blue-500 [&:has(.active)]:!border-l-2':
        active,
      '[&:has(.active)]:!border-purple-500': !active,
      'pl-3 font-medium py-1 flex flex-col gap-1 border-l border-gray-800/50 text-gray-400':
        value.depth === 2,
      'pl-6 py-1 flex flex-col gap-1 border-l border-gray-800/50 text-gray-500':
        value.depth === 3,
    }"
  >
    <a :href="`#${value.id}`">{{ value.text }}</a>
  </li>
  <ul v-if="value.children">
    <DocsTocEntry
      v-for="link in value.children"
      :key="link.id || link.text"
      :value="link"
    />
  </ul>
</template>

<script setup lang="ts">
import { useRoute, computed } from "#imports";

type TocEntry = {
  id: string;
  depth: number;
  text: string;
} & { children?: TocEntry[] };
const props = defineProps<{
  value: TocEntry;
}>();
const route = useRoute();
const active = computed(() => {
  const hash = route.hash;
  return props.value.id === hash.slice(1);
});
</script>
