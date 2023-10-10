<template>
  <p v-if="Comp == null">Component not found 😕</p>
  <ComponentExamplePreview
    v-else
    :docgen-info="story?.component?.__docgenInfo"
    :story="(story as any)"
    :initial-slots="initialSlots"
    :initial-controls="initialControls"
    :handle-models="handleModels"
  />
</template>

<script setup lang="tsx">
import { getStories } from "#stories";
import { useRoute, defineComponent, computed, h } from "#imports";

const props = withDefaults(
  defineProps<{
    storyName: string;
    storyGroup: string;
    initialSlots?: any;
    initialControls?: any;
    handleModels?: any;
  }>(),
  {
    initialSlots: () => ({}),
    initialControls: () => ({}),
    handleModels: () => ({}),
  },
);

const tryParseOrEmptyObject = (val: string) => {
  try {
    return JSON.parse(val);
  } catch (error) {
    return {};
  }
};

const kebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

const route = useRoute();

const stories = getStories();

/**
 * use this if you're using resolving vue as 'vue/dist/vue.esm-bundler.js'
 */
const mapSlotsWithTemplate = ([key, value]: [string, unknown]) => {
  return [
    key,
    () => {
      try {
        return h(
          defineComponent({
            template: value + "",
          }),
        );
      } catch (error) {
        return value;
      }
    },
  ];
};

const story = computed(() => {
  for (const [storyGroup, storyExports] of Object.entries(stories)) {
    for (const [storyName, story] of Object.entries(storyExports)) {
      if (
        [kebabCase(props.storyGroup), kebabCase(props.storyName)].join("_") ===
        [kebabCase(storyGroup), kebabCase(storyName)].join("_")
      ) {
        return story;
      }
    }
  }
  return null;
});

const Comp = computed(() => {
  const controls = tryParseOrEmptyObject(route.query.controls + "");
  const slots = Object.fromEntries(
    Object.entries(tryParseOrEmptyObject(route.query.slots + "")).map(
      mapSlotsWithTemplate,
    ),
  );
  if (story.value) {
    return story.value.render({
      props: { ...story.value.args, ...controls },
      slots: { ...story.value.slots, ...slots },
    } as any);
  }
  return null;
});
</script>
