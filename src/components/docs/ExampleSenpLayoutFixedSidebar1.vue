<template>
  <div class="relative flex flex-col pt-2 w-full min-h-96 not-prose">
    <DocsTab :options="options" :classes="{ options: { extend: 'text-sm' }, optionsWrapper: { extend: 'pb-2' } }" chips>
      <template #default="{ active }: { active: (typeof options)[number] }">
        <div v-if="active === 'base'" class="border-2 border-neutral-500/60 bg-teal-800 h-[500px] overflow-auto">
          <SenpLayoutFixedSidebar
            :classes="{
              header: {
                extend: 'bg-teal-900 shadow',
              },
              content: {
                extend: 'bg-zinc-900/90 !grid grid-cols-2 ',
              },
              footer: {
                extend: 'bg-zinc-700/80',
              },
              sidebar: {
                extend: '!max-w-[200px] pb-8',
              },
            }"
          >
            <template #header>
              <h1 class="text-xl font-serif tracking-wider text-teal-200">🪴 Plant.co</h1>
            </template>
            <template #sidebar>
              <div
                class="h-16 sticky top-0 bg-teal-800/50 border-b backdrop-blur border-teal-900 -mx-2 px-2 flex items-center shrink-0"
              >
                Articles
              </div>
              <nav class="grid gap-3">
                <li v-for="plant in plants" class="text-xs list-none text-teal-100/70">
                  {{ plant.title }}
                </li>
              </nav>
            </template>
            <template #content>
              <div
                v-for="plant in plants"
                :key="plant.uri"
                class="rounded-xl overflow-hidden flex flex-col gap-2 bg-teal-800/40 shadow"
              >
                <img :src="plant.uri" class="w-full h-32 object-cover" />
                <div class="px-2 grid gap-1 pb-2">
                  <p class="text-teal-300 font-serif">{{ plant.title }}</p>
                  <p class="text-xs font-serif text-teal-300/80">
                    {{ plant.timestamp.toLocaleDateString() }}
                  </p>
                </div>
              </div>
            </template>
            <template #footer>
              <p>© Plant.co 2022, all rights reserved</p>
            </template>
          </SenpLayoutFixedSidebar>
        </div>
        <div v-if="active === 'fixed_head'" class="border-2 border-neutral-500/60 bg-teal-800 h-[500px] overflow-auto">
          <SenpLayoutFixedSidebar
            fixed-header
            :classes="{
              header: {
                extend: 'bg-teal-900/80 backdrop-blur shadow',
              },
              content: {
                extend: 'bg-zinc-900/90 !grid grid-cols-2 ',
              },
              footer: {
                extend: 'bg-zinc-700/80',
              },
              sidebar: {
                extend: '!max-w-[200px] pb-8',
              },
            }"
          >
            <template #header>
              <h1 class="text-xl font-serif tracking-wider text-teal-200">🪴 Plant.co</h1>
            </template>
            <template #sidebar>
              <div
                class="h-16 sticky top-0 bg-teal-800/50 border-b backdrop-blur border-teal-900 -mx-2 px-2 flex items-center shrink-0"
              >
                Articles
              </div>
              <nav class="grid gap-3">
                <li v-for="plant in plants" class="text-xs list-none text-teal-100/70">
                  {{ plant.title }}
                </li>
              </nav>
            </template>
            <template #content>
              <div
                v-for="plant in plants"
                :key="plant.uri"
                class="rounded-xl overflow-hidden flex flex-col gap-2 bg-teal-800/40 shadow"
              >
                <img :src="plant.uri" class="w-full h-32 object-cover" />
                <div class="px-2 grid gap-1 pb-2">
                  <p class="text-teal-300 font-serif">{{ plant.title }}</p>
                  <p class="text-xs font-serif text-teal-300/80">
                    {{ plant.timestamp.toLocaleDateString() }}
                  </p>
                </div>
              </div>
            </template>
            <template #footer>
              <p>© Plant.co 2022, all rights reserved</p>
            </template>
          </SenpLayoutFixedSidebar>
        </div>
        <div v-if="active === 'fixed_foot'" class="border-2 border-neutral-500/60 bg-teal-800 h-[500px] overflow-auto">
          <SenpLayoutFixedSidebar
            fixed-footer
            :classes="{
              header: {
                extend: 'bg-teal-900 shadow',
              },
              content: {
                extend: 'bg-zinc-900/90 !grid grid-cols-2 ',
              },
              footer: {
                extend: 'bg-zinc-700/80 backdrop-blur',
              },
              sidebar: {
                extend: '!max-w-[200px] pb-8',
              },
            }"
          >
            <template #header>
              <h1 class="text-xl font-serif tracking-wider text-teal-200">🪴 Plant.co</h1>
            </template>
            <template #sidebar>
              <div
                class="h-16 sticky top-0 bg-teal-800/50 border-b backdrop-blur border-teal-900 -mx-2 px-2 flex items-center shrink-0"
              >
                Articles
              </div>
              <nav class="grid gap-3">
                <li v-for="plant in plants" class="text-xs list-none text-teal-100/70">
                  {{ plant.title }}
                </li>
              </nav>
            </template>
            <template #content>
              <div
                v-for="plant in plants"
                :key="plant.uri"
                class="rounded-xl overflow-hidden flex flex-col gap-2 bg-teal-800/40 shadow"
              >
                <img :src="plant.uri" class="w-full h-32 object-cover" />
                <div class="px-2 grid gap-1 pb-2">
                  <p class="text-teal-300 font-serif">{{ plant.title }}</p>
                  <p class="text-xs font-serif text-teal-300/80">
                    {{ plant.timestamp.toLocaleDateString() }}
                  </p>
                </div>
              </div>
            </template>
            <template #footer>
              <p>© Plant.co 2022, all rights reserved</p>
            </template>
          </SenpLayoutFixedSidebar>
        </div>
        <div v-if="active === 'fixed_both'" class="border-2 border-neutral-500/60 bg-teal-800 h-[500px] overflow-auto">
          <SenpLayoutFixedSidebar
            fixed-header
            fixed-footer
            :classes="{
              header: {
                extend: 'bg-teal-900 shadow',
              },
              content: {
                extend: 'bg-zinc-900/90 !grid grid-cols-2 ',
              },
              footer: {
                extend: 'bg-zinc-700/80 backdrop-blur',
              },
              sidebar: {
                extend: '!max-w-[200px] pb-8',
              },
            }"
          >
            <template #header>
              <h1 class="text-xl font-serif tracking-wider text-teal-200">🪴 Plant.co</h1>
            </template>
            <template #sidebar>
              <div
                class="h-16 sticky top-0 bg-teal-800/50 border-b backdrop-blur border-teal-900 -mx-2 px-2 flex items-center shrink-0"
              >
                Articles
              </div>
              <nav class="grid gap-3">
                <li v-for="plant in plants" class="text-xs list-none text-teal-100/70">
                  {{ plant.title }}
                </li>
              </nav>
            </template>
            <template #content>
              <div
                v-for="plant in plants"
                :key="plant.uri"
                class="rounded-xl overflow-hidden flex flex-col gap-2 bg-teal-800/40 shadow"
              >
                <img :src="plant.uri" class="w-full h-32 object-cover" />
                <div class="px-2 grid gap-1 pb-2">
                  <p class="text-teal-300 font-serif">{{ plant.title }}</p>
                  <p class="text-xs font-serif text-teal-300/80">
                    {{ plant.timestamp.toLocaleDateString() }}
                  </p>
                </div>
              </div>
            </template>
            <template #footer>
              <p>© Plant.co 2022, all rights reserved</p>
            </template>
          </SenpLayoutFixedSidebar>
        </div>
        <div
          v-if="active === 'sidebar_right'"
          class="border-2 border-neutral-500/60 bg-teal-800 h-[500px] overflow-auto"
        >
          <SenpLayoutFixedSidebar
            sidebar-right
            :classes="{
              header: {
                extend: 'bg-teal-900 shadow',
              },
              content: {
                extend: 'bg-zinc-900/90 !grid grid-cols-2 ',
              },
              footer: {
                extend: 'bg-zinc-700/80',
              },
              sidebar: {
                extend: '!max-w-[200px] pb-8',
              },
            }"
          >
            <template #header>
              <h1 class="text-xl font-serif tracking-wider text-teal-200">🪴 Plant.co</h1>
            </template>
            <template #sidebar>
              <div
                class="h-16 sticky top-0 bg-teal-800/50 border-b backdrop-blur border-teal-900 -mx-2 px-2 flex items-center shrink-0"
              >
                Articles
              </div>
              <nav class="grid gap-3">
                <li v-for="plant in plants" class="text-xs list-none text-teal-100/70">
                  {{ plant.title }}
                </li>
              </nav>
            </template>
            <template #content>
              <div
                v-for="plant in plants"
                :key="plant.uri"
                class="rounded-xl overflow-hidden flex flex-col gap-2 bg-teal-800/40 shadow"
              >
                <img :src="plant.uri" class="w-full h-32 object-cover" />
                <div class="px-2 grid gap-1 pb-2">
                  <p class="text-teal-300 font-serif">{{ plant.title }}</p>
                  <p class="text-xs font-serif text-teal-300/80">
                    {{ plant.timestamp.toLocaleDateString() }}
                  </p>
                </div>
              </div>
            </template>
            <template #footer>
              <p>© Plant.co 2022, all rights reserved</p>
            </template>
          </SenpLayoutFixedSidebar>
        </div>
      </template>
    </DocsTab>
  </div>
</template>

<script setup lang="ts">
const plants = [
  {
    title: 'All About Plants',
    description: '',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    uri: 'https://images.unsplash.com/photo-1516528387618-afa90b13e000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8UGxhbnR8fHx8fHwxNjcyMTc3OTA3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    title: 'My Flora and Me',
    description: '',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    uri: 'https://images.unsplash.com/photo-1484553255294-313b931acd27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8UGxhbnR8fHx8fHwxNjcyMTc3OTEw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    title: 'Le Fleur Chic',
    description: '',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    uri: 'https://images.unsplash.com/photo-1494516192674-b82b5f1e61dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8UGxhbnR8fHx8fHwxNjcyMTc3OTEy&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    title: 'How to get a teal thumb',
    description: '',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    uri: 'https://images.unsplash.com/photo-1493382051629-7eb03ec93ea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8UGxhbnR8fHx8fHwxNjcyMTc3OTEz&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    title: '10 facts about cacti',
    description: '',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    uri: 'https://images.unsplash.com/photo-1498612753354-772a30629934?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8UGxhbnR8fHx8fHwxNjcyMTc3OTE2&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    title: 'Watering Essentials',
    description: '',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    uri: 'https://images.unsplash.com/photo-1545241047-6083a3684587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8UGxhbnR8fHx8fHwxNjcyMTc3OTE4&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    title: 'What does your soil say about you',
    description: '',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    uri: 'https://images.unsplash.com/photo-1514123786680-91460892e7bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8UGxhbnR8fHx8fHwxNjcyMTc3OTIw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    title: 'The dirty truth',
    description: '',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    uri: 'https://images.unsplash.com/photo-1483794344563-d27a8d18014e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8UGxhbnR8fHx8fHwxNjcyMTc3OTIy&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    title: 'Industry Plant',
    description: '',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    uri: 'https://images.unsplash.com/photo-1516048015710-7a3b4c86be43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8UGxhbnR8fHx8fHwxNjcyMTc3OTIz&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    title: 'Trees Trees Trees',
    description: '',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    uri: 'https://images.unsplash.com/photo-1479658744930-03854858a953?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8UGxhbnR8fHx8fHwxNjcyMTc3OTI1&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    title: 'How about them apples',
    description: '',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    uri: 'https://images.unsplash.com/photo-1493382051629-7eb03ec93ea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8UGxhbnR8fHx8fHwxNjcyMTc3OTI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    title: 'A seed and a dream',
    description: '',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    uri: 'https://images.unsplash.com/photo-1498569026542-39c64353e401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8UGxhbnR8fHx8fHwxNjcyMTc3OTI5&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    title: 'Growing to love nature',
    description: '',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    uri: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8UGxhbnR8fHx8fHwxNjcyMTc3OTMx&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    title: 'Do you have the right pots?',
    description: '',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    uri: 'https://images.unsplash.com/photo-1504541891213-1b1dfdadb739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8UGxhbnR8fHx8fHwxNjcyMTc3OTMz&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
]
const values = reactive({
  base: '',
  fixed_head: '',
  fixed_foot: '',
  fixed_both: '',
  sidebar_right: '',
})

const options = Object.keys(values) as Array<keyof typeof values>
</script>
