<template>
  <div class="relative">
    <ClientOnly>
      <div
        :class="{
          'max-h-screen overflow-auto': settingsStrategy === 'absolute',
          ...$senpCx('', classes?.wrapper),
        }"
      >
        <DynamicScroller
          :items="filteredData"
          :min-item-size="40"
          :page-mode="settingsStrategy === 'fixed'"
          :key-field="keyField"
        >
          <template #default="{ item, index, active }">
            <DynamicScrollerItem
              :item="item"
              :active="active"
              :data-index="index"
            >
              <section class="grid gap-2 py-6 px-4 border-b border-gray-800">
                <div
                  v-if="
                    headers.filter((a) => a.visible && a.as === 'list').length
                  "
                  class="grid pb-3"
                  :style="`gap: ${
                    state.cellGap === 'sm'
                      ? '0.5rem'
                      : state.cellGap === 'md'
                        ? '1rem'
                        : '2rem'
                  }`"
                >
                  <template
                    v-for="k in [...headers].filter(
                      (a) => a.visible && a.as === 'list'
                    )"
                  >
                    <div
                      class="flex w-max"
                      :class="{
                        'text-lg': k.size === 'md',
                        'text-2xl font-medium': k.size === 'lg',
                        'pb-3': k.size === 'lg' && k.span === 'full',
                        'gap-2 items-baseline flex-row': k.labelSide === 'left',
                        'gap-2 items-baseline flex-row-reverse':
                          k.labelSide === 'right',
                        'flex-col': k.labelSide === 'top',
                        'flex-col-reverse': k.labelSide === 'bottom',
                      }"
                    >
                      <p
                        v-if="k.label"
                        class="text-xs"
                        :class="{
                          'text-gray-400': k.style === 'standard',
                          'text-gray-600': k.style === 'muted',
                        }"
                      >
                        {{ k.label }}
                      </p>
                      <p
                        :class="{
                          'text-white': k.style === 'standard',
                          'text-gray-400': k.style === 'muted',
                        }"
                      >
                        {{ item[k.key] }}
                      </p>
                    </div>
                  </template>
                </div>
                <section
                  v-if="
                    state.tagPosition === 'top' &&
                      headers.filter((a) => a.visible && a.as === 'tag').length
                  "
                  class="flex flex-wrap gap-2 pb-3"
                >
                  <div
                    v-for="k in headers.filter(
                      (a) => a.visible && a.as === 'tag'
                    )"
                    class="rounded bg-gray-900 flex leading-none"
                    :class="{
                      'items-center flex-row': k.labelSide === 'left',
                      'items-center flex-row-reverse': k.labelSide === 'right',
                      'justify-center flex-col': k.labelSide === 'top',
                      'justify-center flex-col-reverse':
                        k.labelSide === 'bottom',
                    }"
                  >
                    <div
                      class="text-xs"
                      :class="{
                        'text-gray-400': k.style === 'standard',
                        'text-gray-600': k.style === 'muted',
                        'py-1 pl-2 pr-1': k.labelSide === 'left',
                        'py-1 pr-2 pl-1': k.labelSide === 'right',
                      }"
                    >
                      {{ k.label }}
                    </div>
                    <div
                      :class="{
                        'text-white': k.style === 'standard',
                        'text-gray-400': k.style === 'muted',
                        'py-1 pr-2 pl-1': k.labelSide === 'left',
                        'py-1 pl-2 pr-1': k.labelSide === 'right',
                      }"
                    >
                      {{ item[k.key] }}
                    </div>
                  </div>
                </section>
                <div
                  v-if="
                    headers.filter((a) => a.visible && a.as === 'cell').length
                  "
                  class="flex space-evenly flex-wrap md:grid"
                  :class="{
                    'bg-gray-900 p-4 rounded-xl': headers.filter(
                      (a) => a.visible && a.as !== 'cell'
                    ).length,
                    'gap-4 md:gap-2': state.cellGap === 'sm',
                    'gap-4': state.cellGap === 'md',
                    'gap-8': state.cellGap === 'md',
                  }"
                  :style="`grid-template-columns: repeat(${headers
                    .filter((a) => a.visible && a.as === 'cell')
                    .reduce(
                      (prev, curr) =>
                        (prev += curr.span === 'full' ? 0 : Number(curr.span)),
                      0
                    )}, ${
                    state.cellSpacing === 'even'
                      ? 'minmax(0, 1fr)'
                      : state.cellSpacing === 'auto'
                        ? 'auto'
                        : 'max-content'
                  });`"
                >
                  <template
                    v-for="k in headers.filter(
                      (a) => a.visible && a.as === 'cell'
                    )"
                  >
                    <div
                      :style="`grid-column: ${
                        k.span === 'full' ? '1' : 'span ' + k.span
                      } / ${k.span === 'full' ? '-1' : 'span ' + k.span}`"
                      class="flex"
                      :class="{
                        'text-lg': k.size === 'md',
                        'text-2xl font-medium': k.size === 'lg',
                        'py-3': k.span === 'full',
                        'gap-2 items-baseline flex-row': k.labelSide === 'left',
                        'gap-2 items-baseline flex-row-reverse':
                          k.labelSide === 'right',
                        'flex-col': k.labelSide === 'top',
                        'flex-col-reverse': k.labelSide === 'bottom',
                      }"
                    >
                      <p
                        v-if="k.label"
                        class="text-xs shrink-0 break-all"
                        :class="{
                          'text-gray-400': k.style === 'standard',
                          'text-gray-600': k.style === 'muted',
                        }"
                      >
                        {{ k.label }}
                      </p>
                      <p
                        class="break-words"
                        :class="{
                          'text-white': k.style === 'standard',
                          'text-gray-400': k.style === 'muted',
                        }"
                      >
                        {{ item[k.key] }}
                      </p>
                    </div>
                  </template>
                </div>
                <section
                  v-if="
                    state.tagPosition === 'bottom' &&
                      headers.filter((a) => a.visible && a.as === 'tag').length
                  "
                  class="flex flex-wrap gap-2"
                >
                  <div
                    v-for="k in headers.filter(
                      (a) => a.visible && a.as === 'tag'
                    )"
                    class="rounded bg-gray-900 flex leading-none"
                    :class="{
                      'items-center flex-row': k.labelSide === 'left',
                      'items-center flex-row-reverse': k.labelSide === 'right',
                      'justify-center flex-col': k.labelSide === 'top',
                      'justify-center flex-col-reverse':
                        k.labelSide === 'bottom',
                    }"
                  >
                    <div
                      class="text-xs"
                      :class="{
                        'text-gray-400': k.style === 'standard',
                        'text-gray-600': k.style === 'muted',
                        'py-1 pl-2 pr-1': k.labelSide === 'left',
                        'py-1 pr-2 pl-1': k.labelSide === 'right',
                      }"
                    >
                      {{ k.label }}
                    </div>
                    <div
                      :class="{
                        'text-white': k.style === 'standard',
                        'text-gray-400': k.style === 'muted',
                        'py-1 pr-2 pl-1': k.labelSide === 'left',
                        'py-1 pl-2 pr-1': k.labelSide === 'right',
                      }"
                    >
                      {{ item[k.key] }}
                    </div>
                  </div>
                </section>
                <details
                  v-if="
                    headers.filter((a) => a.visible && a.as === 'details')
                      .length
                  "
                  :class="{
                    'bg-gray-900/20 border-l-2 border-gray-900 !px-4':
                      !headers.filter((a) => a.visible && a.as !== 'cell')
                        .length,
                  }"
                  class="rounded-sm py-2 px-2 leading-none w-full"
                >
                  <summary class="w-full cursor-pointer">
                    <div class="inline ml-2 text-sm w-full">
                      Details
                    </div>
                  </summary>
                  <div
                    class="grid gap-2 py-2"
                    :class="{
                      '!px-6': !headers.filter(
                        (a) => a.visible && a.as !== 'cell'
                      ).length,
                    }"
                  >
                    <div
                      v-for="k in headers.filter(
                        (a) => a.visible && a.as === 'details'
                      )"
                      class="rounded bg-gray-900 px-4 py-1 flex items-center leading-none w-full"
                    >
                      <details class="w-full">
                        <summary class="w-full cursor-pointer">
                          <div class="inline ml-2 text-sm w-full">
                            {{ k.label }}
                          </div>
                        </summary>
                        <p class="py-6 ml-6">
                          {{ item[k.key] }}
                        </p>
                      </details>
                    </div>
                  </div>
                </details>
              </section>
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </div>
      <slot name="settingsTrigger">
        <div
          class="z-50 bottom-0 right-0 m-4 sm:m-8"
          :class="{
            fixed: settingsStrategy === 'fixed',
            absolute: settingsStrategy === 'absolute',
          }"
        >
          <button
            class="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center rounded-full bg-blue-600 hover:animate-wiggle animation-repeat-infinite"
            @click="state.settingsOpen = true"
          >
            <Icon
              class="text-2xl sm:text-3xl"
              name="mdi:cog"
            />
          </button>
        </div>
      </slot>
    </ClientOnly>
  </div>
  <ClientOnly>
    <SenpDrawer
      v-model:open="state.settingsOpen"
      side="bottom"
      :classes="{ maxSize: { base: 'w-full max-h-[75vh]' } }"
      title="Table Settings"
    >
      <p class="mx-4 py-2 text-sm">
        Filters
      </p>
      <div class="m-3 rounded-lg bg-gray-900/20 p-2 grid gap-4">
        <div class="grid gap-4">
          <div class="grid gap-1">
            <p class="text-xs text-gray-200">
              Limit Data
            </p>
            <SenpTextInput v-model="state.limit" />
          </div>
          <div class="grid gap-1">
            <p class="text-xs text-gray-200">
              Filters
            </p>
            <div class="grid gap-2">
              <div
                v-for="(filter, i) in filters"
                class="flex items-center gap-2"
              >
                <SenpSelect
                  v-model="filter.key"
                  placeholder="-- Field --"
                  :options="headers.map((a) => a.key)"
                />
                <SenpSelect
                  v-model="filter.op"
                  placeholder="-- Operation --"
                  :options="(filterOperations as any)"
                />
                <SenpTextInput v-model="filter.value" />
                <div class="flex items-center gap-1">
                  <p class="text-lg text-gray-400">
                    (
                  </p>
                  <p class="text-xs text-gray-400">
                    Options
                  </p>
                  <SenpAutoComplete
                    v-if="
                      (filter.op === '=' || filter.op === '!=') && filter.key
                    "
                    :model-value="{ label: filter.value, value: filter.value }"
                    :display-value="(a) => a.label"
                    :options="
                      filteredData.map((a) => ({
                        label: a[filter.key],
                        value: a[filter.key],
                      }))
                    "
                    @update:model-value="(v) => (filter.value = v.label)"
                  />
                  <p class="text-lg text-gray-400">
                    )
                  </p>
                </div>
                <SenpButton @click="() => filters.splice(i, 1)">
                  <Icon name="mdi:trash-can" />
                </SenpButton>
              </div>
              <SenpButton
                @click="() => filters.push({ key: '', op: '=', value: '' })"
              >
                <Icon name="mdi:plus" />Add Filter
              </SenpButton>
            </div>
          </div>
          <p>{{ filteredData.length }} results</p>
        </div>
      </div>
      <p class="mx-4 py-2 text-sm">
        Sorters
      </p>
      <div class="m-3 rounded-lg bg-gray-900/20 p-2 grid gap-4">
        <div class="grid gap-2">
          <div
            v-for="(sorter, i) in sorters"
            class="flex items-center gap-2"
          >
            <SenpSelect
              v-model="sorter.key"
              placeholder="-- Field --"
              :options="headers.map((a) => a.key)"
            />
            <SenpSelect
              v-model="sorter.op"
              placeholder="-- Order --"
              :options="(sorterOperations as any)"
            />
            <SenpButton @click="() => sorters.splice(i, 1)">
              <Icon name="mdi:trash-can" />
            </SenpButton>
          </div>
          <SenpButton @click="() => sorters.push({ key: '', op: 'desc' })">
            <Icon name="mdi:plus" />Add sorter
          </SenpButton>
        </div>
      </div>
      <p class="mx-4 py-2 text-sm">
        Global Settings
      </p>
      <div class="m-3 rounded-lg overflow-hidden bg-gray-900/20 p-2 grid gap-4">
        <div class="flex flex-wrap gap-4">
          <div class="grid gap-1">
            <p class="text-xs text-gray-200">
              Cell Spacing
            </p>
            <SenpRadioGroup
              v-model="state.cellSpacing"
              :options="['even', 'max', 'auto']"
            />
          </div>
          <div class="grid gap-1">
            <p class="text-xs text-gray-200">
              Cell Gap
            </p>
            <SenpRadioGroup
              v-model="state.cellGap"
              :options="['sm', 'md', 'lg']"
            />
          </div>
          <div class="grid gap-1">
            <p class="text-xs text-gray-200">
              Tag Position
            </p>
            <SenpRadioGroup
              v-model="state.tagPosition"
              :options="['top', 'bottom']"
            />
          </div>
        </div>
        <div class="grid gap-1">
          <p class="text-xs text-gray-200">
            Set All
          </p>
          <div class="flex gap-4 flex-wrap">
            <SenpActionButtonGroup
              :options="['cell', 'list', 'details', 'tag']"
              @click="
                (value) => {
                  headers.forEach((_, i) => {
                    headers[i].as = value;
                  });
                }
              "
            />
            <SenpActionButtonGroup
              :options="['sm', 'md', 'lg']"
              @click="
                (value) => {
                  headers.forEach((_, i) => {
                    headers[i].size = value;
                  });
                }
              "
            />
            <SenpActionButtonGroup
              :options="['top', 'left', 'right', 'bottom']"
              @click="
                (value) => {
                  headers.forEach((_, i) => {
                    headers[i].labelSide = value;
                  });
                }
              "
            />
            <SenpActionButtonGroup
              :options="['standard', 'muted']"
              @click="
                (value) => {
                  headers.forEach((_, i) => {
                    headers[i].style = value;
                  });
                }
              "
            />
            <SenpActionButtonGroup
              :options="[{ value: true }, { value: false }]"
              @click="(value: boolean) => {
                headers.forEach((_, i) => {
                  headers[i].visible = value
                })
              }"
            >
              <template #0>
                <Icon
                  name="mdi:eye-outline"
                  class="text-gray-400"
                />
              </template>
              <template #1>
                <Icon
                  name="mdi:eye-off-outline"
                  class="text-gray-400"
                />
              </template>
            </SenpActionButtonGroup>
          </div>
        </div>
      </div>
      <p class="mx-4 py-2 text-sm">
        Field Settings
      </p>
      <SenpDraggableList
        v-model="headers"
        handle=".handle"
        class="grid gap-2 md:block md:divide-y md:divide-gray-900 m-3 rounded-lg overflow-hidden"
      >
        <template #item="{ element }">
          <li
            class="rounded-lg md:rounded-none bg-gray-900/20 px-2 py-1 cursor-move list-none grid md:grid-cols-12 gap-2 items-center"
          >
            <div class="flex items-center gap-2 md:col-span-4">
              <div class="handle p-1 text-lg">
                <Icon name="mdi:reorder-horizontal" />
              </div>
              <p class="break-all">
                {{ element.key }}
              </p>
              <HeadlessSwitch v-model="element.visible">
                <div
                  class="text-lg w-8 h-8 flex justify-center items-center rounded bg-gray-900"
                >
                  <Icon
                    v-if="element.visible"
                    name="mdi:eye-outline"
                    class="text-blue-400"
                  />
                  <Icon
                    v-else
                    name="mdi:eye-off-outline"
                    class="text-gray-400"
                  />
                </div>
              </HeadlessSwitch>
            </div>
            <div
              v-if="element.visible"
              class="flex flex-wrap gap-2 items-center ml-auto md:col-span-8 border-t md:border-none border-gray-900/50"
            >
              <SenpTextInput v-model="element.label" />
              <SenpRadioGroup
                v-model="element.as"
                :options="['cell', 'list', 'details', 'tag']"
                @update:modelValue="
                  (v) => {
                    if (v === 'tag') {
                      element.labelSide = 'left';
                    }
                  }
                "
              />
              <SenpRadioGroup
                v-model="element.size"
                :options="['sm', 'md', 'lg']"
              />
              <SenpRadioGroup
                v-model="element.span"
                :options="['1', '2', '3', '4', 'full']"
              />
              <SenpRadioGroup
                v-model="element.labelSide"
                :options="['top', 'left', 'right', 'bottom']"
              />
              <SenpRadioGroup
                v-model="element.style"
                :options="['standard', 'muted']"
              />
            </div>
          </li>
        </template>
      </SenpDraggableList>
    </SenpDrawer>
  </ClientOnly>
</template>

<script setup lang="ts">
import { SenpCx } from "../plugins/senpCx";
import type {
  CsvFilter,
  CsvSorter,
  CsvSettings,
  CsvState,
} from "../composables/useCsvFiltering";
import { useCsvFiltering } from "../composables/useCsvFiltering";
import { useQueryParamSync } from "../composables/useQueryParamSync";

const props = withDefaults(
  defineProps<{
    data: any[];
    keyField?: string;
    limitTo?: number;
    initialFilters?: CsvFilter[] | string;
    initialSorters?: CsvSorter[] | string;
    initialSettings?: CsvSettings[] | string;
    initialState?: CsvState | string;
    settingsStrategy?: "fixed" | "absolute";
    queryKeyPrefix?: string;
    classes?: {
      wrapper?: SenpCx;
    };
  }>(),
  {
    queryKeyPrefix: "",
    keyField: "id",
    settingsStrategy: "fixed",
  }
);

const {
  filters,
  sorters,
  filteredData,
  filterOperations,
  sorterOperations,
  headers,
  state,
} = useCsvFiltering(props.data, {
  limitTo: props.limitTo,
  initialFilters: props.initialFilters,
  initialSorters: props.initialSorters,
  initialState: props.initialState,
  initialSettings: props.initialSettings,
});

useQueryParamSync(headers, [props.queryKeyPrefix, "dv"].join(""), {
  watchDeep: true,
  runOnMounted: true,
});
useQueryParamSync(filters, [props.queryKeyPrefix, "f"].join(""), {
  watchDeep: true,
  runOnMounted: true,
});
useQueryParamSync(sorters, [props.queryKeyPrefix, "s"].join(""), {
  watchDeep: true,
  runOnMounted: true,
});
useQueryParamSync(state, [props.queryKeyPrefix, "st"].join(""), {
  watchDeep: true,
  runOnMounted: true,
});
</script>

<style scoped>
summary::marker {
  color: #ffffff60;
}
</style>
../plugins/senpCx
