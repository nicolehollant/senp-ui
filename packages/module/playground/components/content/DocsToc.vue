<template>
  <aside>
    <button
      v-if="toggleable"
      class="text-sm font-medium text-gray-400 flex items-center gap-2"
      @click="open = !open"
    >
      <div>Table Of Contents</div>
      <Icon
        class="text-gray-500 text-lg transform duration-300"
        name="mdi:chevron-right"
        :class="{ 'rotate-90': open }"
      />
    </button>
    <p
      v-else
      class="text-sm text-gray-200"
    >
      Table Of Contents
    </p>
    <ul
      v-show="!toggleable || (toggleable && open)"
      id="senp-ui-docs-toc"
      class="mt-4"
    >
      <DocsTocEntry
        v-for="link in value.links"
        :value="link"
      />
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "#imports";
type TocEntry = {
  id: string;
  depth: number;
  text: string;
} & { children?: TocEntry[] };
withDefaults(
  defineProps<{
    toggleable?: boolean;
    value: {
      title: string;
      searchDepth: number;
      depth: number;
      links: TocEntry[];
    };
  }>(),
  {
    toggleable: false,
  }
);

const open = ref(false);

const observer = ref<IntersectionObserver>();
onMounted(() => {
  nextTick(() => {
    nextTick(() => {
      observer.value = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (entry.intersectionRatio > 0) {
            document
              .querySelectorAll(`#senp-ui-docs-toc a[href="#${id}"]`)
              ?.forEach((a) => a?.classList?.add?.("active"));
          } else {
            document
              .querySelectorAll(`#senp-ui-docs-toc a[href="#${id}"]`)
              ?.forEach((a) => a?.classList?.remove?.("active"));
          }
        });
      });
      // observer.value.observe(target)
      document
        .querySelectorAll("h1[id], h2[id], h3[id], h4[id]")
        .forEach((section) => {
          observer.value!.observe(section);
        });
    });
  });
});
</script>
