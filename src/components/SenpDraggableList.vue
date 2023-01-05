<template>
  <ClientOnly>
    <draggable
      v-bind="$attrs"
      :animation="200"
      :group="'description'"
      :disabled="false"
      :ghostClass="'ghost'"
      class="list-group"
      :component-data="{
        tag: 'ul',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
      }"
      @update:modelValue="(v: any[]) => $emit('update:modelValue', v)"
      :modelValue="modelValue"
      @start="drag = true"
      @end="drag = false"
      :item-key="itemKey"
      :handle="handle"
    >
      <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
        <div class="w-full h-full">
          <slot :name="slot" v-bind="scope"></slot>
        </div>
      </template>
    </draggable>
  </ClientOnly>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
withDefaults(
  defineProps<{
    modelValue: any[]
    itemKey?: string
    handle?: string
  }>(),
  {
    itemKey: 'id',
    handle: '',
  }
)

defineEmits<{
  (event: 'update:modelValue', value: any[]): void
}>()

const drag = ref(false)
</script>

<style>
.ghost {
  @apply opacity-50;
}
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
