<template>
  <SenpLayoutBasic
    fixed-header
    :classes="{
      content: {
        extend: '!flex-row overflow-hidden !p-0 rest-playground !gap-0',
      },
      header: {
        extend: 'border-b-2 border-neutral-800 !pr-2',
      },
      footer: {
        base: 'hidden',
      },
    }"
    class="bg-neutral-900"
  >
    <template #header>
      <h1 class="text-lg lg:text-xl">{{ title }}</h1>
      <div class="flex items-center gap-4">
        <SenpRadioGroup
          :options="['horizontal', 'vertical']"
          :classes="{ option: { extend: '!bg-neutral-800' } }"
          v-model="state.view"
        >
          <template #0>
            <Icon name="icon-park-outline:freeze-column"></Icon>
          </template>
          <template #1>
            <Icon name="icon-park-outline:freeze-column" class="transform rotate-90"></Icon>
          </template>
        </SenpRadioGroup>
        <button
          class="lg:hidden rounded cursor-pointer px-2 h-8 flex items-center justify-center bg-neutral-800 text-neutral-200 text-lg hover:bg-neutral-700 transition"
          @click="() => (navOpen = true)"
        >
          <Icon name="mdi:menu" />
        </button>
      </div>
    </template>
    <template #content>
      <div>
        <SenpDrawer
          :classes="{
            maxSize: { base: 'w-full max-h-full max-w-[min(95vw,448px)] md:max-w-4xl h-full' },
          }"
          side="left"
          v-model:open="navOpen"
          :title="title"
          ><aside class="sticky top-0">
            <nav>
              <button
                @click="
                  () => {
                    setActiveRoute(route)
                    navOpen = false
                  }
                "
                v-for="route in routes"
                :key="route.method + route.path"
                class="flex items-center gap-2 text-xs w-full px-2 py-2 rounded-md"
                :class="{
                  'bg-neutral-900': route.method === state.activeMethod && baseurl + route.path === state.activeRoute,
                }"
              >
                <ApiMethod :method="route.method"></ApiMethod>
                <p class="break-all">{{ route.title ?? route.path }}</p>
              </button>
            </nav>
          </aside>
        </SenpDrawer>
      </div>
      <aside
        class="hidden shrink-0 py-4 px-2 lg:block h-full bg-black/20 border-r border-neutral-700 max-w-[200px] overflow-auto"
      >
        <nav>
          <button
            @click="() => setActiveRoute(route)"
            v-for="route in routes"
            :key="route.method + route.path"
            class="flex items-center gap-2 text-xs w-full px-2 py-2 rounded-md"
            :class="{
              'bg-neutral-800': route.method === state.activeMethod && baseurl + route.path === state.activeRoute,
            }"
          >
            <ApiMethod :method="route.method"></ApiMethod>
            <p class="break-all">{{ route.title ?? route.path }}</p>
          </button>
        </nav>
      </aside>
      <div class="grid grid-rows-[auto,minmax(0px,1fr)] w-full">
        <div class="flex items-center gap-2 p-2 border-b border-neutral-700">
          <SenpSelect
            class="w-32"
            v-model="state.activeMethod"
            :options="['GET', 'PUT', 'POST', 'DELETE']"
          ></SenpSelect>
          <SenpTextInput class="w-full" v-model="state.activeRoute"></SenpTextInput>
          <SenpButton @click="() => makeRequest()">Send</SenpButton>
        </div>
        <splitpanes class="w-full h-full overflow-auto" :horizontal="state.view === 'vertical'">
          <pane min-size="20" max-size="80">
            <SenpCodeEditor
              theme="onedark"
              language="json"
              style="overflow: auto; height: 100%"
              enter-action="default"
              v-model="state.body"
              class="overflow-auto rounded-none editor"
            ></SenpCodeEditor>
          </pane>
          <pane min-size="20" max-size="80">
            <div
              class="grid w-full h-full"
              :class="{
                'grid-cols-[auto,minmax(0px,1fr)]': state.view === 'horizontal',
                'grid-rows-[auto,minmax(0px,1fr)]': state.view === 'vertical',
              }"
            >
              <div
                class="border-neutral-700 bg-neutral-900/50 relative"
                :class="{
                  'w-4 h-full border-x-2': state.view === 'horizontal',
                  'w-full h-4 border-y-2': state.view === 'vertical',
                }"
              >
                <div
                  class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 gap-1"
                  :class="{ 'flex flex-col w-1': state.view === 'horizontal', 'flex h-1': state.view === 'vertical' }"
                >
                  <div
                    class="rounded bg-gray-600"
                    :class="{ 'h-2': state.view === 'horizontal', 'w-2': state.view === 'vertical' }"
                  ></div>
                  <div
                    class="rounded bg-gray-600"
                    :class="{ 'h-2': state.view === 'horizontal', 'w-2': state.view === 'vertical' }"
                  ></div>
                  <div
                    class="rounded bg-gray-600"
                    :class="{ 'h-2': state.view === 'horizontal', 'w-2': state.view === 'vertical' }"
                  ></div>
                </div>
              </div>
              <SenpHljsHighlight
                title="response"
                class="h-full w-full"
                language="json"
                theme="atom-dark"
                :value="response"
              ></SenpHljsHighlight>
            </div>
          </pane>
        </splitpanes>
      </div>
    </template>
  </SenpLayoutBasic>
</template>

<script setup lang="tsx">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { JSONValue } from '../composables/request'

const props = withDefaults(
  defineProps<{
    title?: string
    baseurl?: string
    theme: string
    queryKey?: string
    defaultHeaders?: HeadersInit
    routes: {
      path: string
      title: string
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'ANY' | 'PATCH'
      body: JSONValue
      headers?: HeadersInit
      pathParameters?: { [k: string]: string }
    }[]
  }>(),
  {
    title: 'REST Playground',
    theme: 'atom-dark',
    queryKey: 's',
  }
)
const ApiMethods: any = {
  POST: (
    <div className="w-12 rounded text-center text-xs font-semibold py-0.5 tracking-wider text-orange-200 bg-orange-800/60">
      POST
    </div>
  ),
  GET: (
    <div className="w-12 rounded text-center text-xs font-semibold py-0.5 tracking-wider text-green-200 bg-green-800/60">
      GET
    </div>
  ),
  PUT: (
    <div className="w-12 rounded text-center text-xs font-semibold py-0.5 tracking-wider text-blue-200 bg-blue-800/60">
      PUT
    </div>
  ),
  DELETE: (
    <div className="w-12 rounded text-center text-xs font-semibold py-0.5 tracking-wider text-red-200 bg-red-800/60">
      DEL
    </div>
  ),
}

const ApiMethod = defineComponent({
  props: {
    method: {
      type: String,
      default: 'GET',
    },
  },
  render() {
    return ApiMethods[this.method]
  },
})

const setActiveRoute = (route: typeof props.routes[number]) => {
  state.value.activeMethod = route.method
  state.value.activeRoute = props.baseurl ? props.baseurl + route.path : route.path
  state.value.body = JSON.stringify(route.body, null, 2)
  state.value.activeHeaders = route.headers
}

const state = ref({
  mode: 'request' as 'request' | 'response',
  view: 'horizontal' as 'horizontal' | 'vertical',
  activeRoute: '',
  activeMethod: props.routes?.[0]?.method ?? ('GET' as typeof props.routes[number]['method']),
  activeHeaders: props.routes?.[0]?.headers ?? undefined,
  body: '{}',
})

const navOpen = ref(false)

const response = ref('{}')

const makeRequest = async () => {
  try {
    const res = await request.any(
      state.value.activeMethod as any,
      state.value.activeRoute,
      JSON.parse(state.value.body),
      {
        headers: state.value.activeHeaders ?? props.defaultHeaders ?? undefined,
      }
    )
    response.value = JSON.stringify(res, null, 2)
  } catch (error) {
    response.value = JSON.stringify(error, null, 2)
  }
}
if (props.queryKey) {
  useQueryParamSync(state, props.queryKey, { watchDeep: true, runOnMounted: true })
}
</script>

<style>
.rest-playground .splitpanes {
  @apply bg-neutral-800;
}

.rest-playground .splitpanes__splitter {
  @apply relative bg-transparent;
}
.rest-playground .splitpanes__splitter:before {
  content: '';
  @apply absolute left-0 top-0 transition-opacity opacity-0 z-20 bg-blue-600/30;
}
.rest-playground .splitpanes__splitter:hover:before {
  @apply opacity-100;
}
.rest-playground .splitpanes--vertical > .splitpanes__splitter:before {
  left: -6px;
  right: -22px;
  height: 100%;
}
.rest-playground .splitpanes--horizontal .splitpanes__splitter:before {
  top: -6px;
  bottom: -22px;
  width: 100%;
}
.rest-playground .editor .cm-editor {
  @apply !rounded-none !bg-neutral-800/50;
}
</style>
