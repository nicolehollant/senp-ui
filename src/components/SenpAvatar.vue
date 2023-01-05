<template>
  <img :src="avatarSrc" alt="Avatar" :class="$xClass('w-8 h-8 rounded-full object-cover', classes?.img)" />
</template>

<script setup lang="ts">
import svgToMiniDataURI from 'mini-svg-data-uri'
import { generateFromString } from 'generate-avatar'
import { XClass } from '../plugins/xClass'
const props = defineProps<{
  seed: string
  classes?: {
    img: XClass
  }
}>()

const avatarSrc = computed(() => {
  return svgToMiniDataURI(generateFromString(props.seed))
})
</script>
