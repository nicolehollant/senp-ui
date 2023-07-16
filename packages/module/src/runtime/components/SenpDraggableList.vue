<template>
  <ClientOnly>
    <draggable
      v-bind="$attrs"
      :animation="200"
      :group="group"
      :disabled="false"
      :ghost-class="ghostClass"
      :class="{ 'list-group': true, dragging: drag }"
      :component-data="{
        tag: 'ul',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
      }"
      :model-value="modelValue"
      :item-key="itemKey"
      :handle="handle"
      @update:modelValue="(v: any[]) => $emit('update:modelValue', v)"
      @start="drag = true"
      @end="drag = false"
    >
      <template
        v-for="(_, slot) of $slots"
        #[slot]="scope"
      >
        <div
          :key="scope.element[itemKey]"
          :class="{
            ...$senpCx('w-full h-full', classes?.elementWrapper),
            draggingEl: drag,
          }"
        >
          <slot
            :name="slot"
            v-bind="scope"
            :drag="drag"
          />
        </div>
      </template>
    </draggable>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from "vue";
import draggable from "vuedraggable";
import { SenpCx } from "../plugins/senpCx";
withDefaults(
  defineProps<{
    modelValue: any[];
    itemKey?: string;
    handle?: string;
    group?: string;
    ghostClass?: string;
    classes?: {
      elementWrapper?: SenpCx;
    };
  }>(),
  {
    itemKey: "id",
    handle: "",
    group: "description",
    ghostClass: "ghost",
  }
);

defineEmits<{
  (event: "update:modelValue", value: any[]): void;
}>();

const drag = ref(false);
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
../plugins/senpCx
