<template>
  <div class="flex w-full gap-4">
    <img
      :src="query.data.value?.avatar"
      alt="Chat Avatar"
      class="h-10 w-10 rounded-full object-cover"
    />
    <div class="flex flex-col gap-2">
      <div class="flex items-baseline gap-2">
        <p class="font-bold leading-tight">
          {{ query.data.value?.displayName }}
        </p>
        <p class="text-sm font-medium leading-tight text-gray-500">
          {{
            new Date(message.createdAt).toLocaleString(undefined, {
              dateStyle: "short",
              timeStyle: "short",
            })
          }}
        </p>
      </div>
      <div
        v-html="rendered"
        class="prose prose-sm prose-invert sm:prose-base prose-pre:bg-[#282c34]"
      ></div>
      <!-- <p>{{ message.content }}</p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessageApi } from "@/composables/chatMessageApi";
import { useQuery } from "@tanstack/vue-query";
import markdown from "markdown-it";
import hljs from "highlight.js";

const props = defineProps<{
  message: ChatMessageApi["GetAllResponse"][number];
}>();

const query = useQuery({
  queryFn: async () => {
    const [res] = await accountApi.match({ accountID: props.message.userID });
    return res;
  },
  queryKey: [...accountApiQueryKeys.getOneByID, props.message.userID],
  enabled: !!props.message.userID,
});

const md = markdown({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ""; // use external default escaping
  },
}).disable(["link", "image"]);
const rendered = computed(() => md.render(props.message.content));
</script>

<style>
@import "highlight.js/styles/atom-one-dark.css";
</style>
