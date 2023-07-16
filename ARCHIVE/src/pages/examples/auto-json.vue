<template>
  <SenpLayoutBasic
    fixed-header
    :classes="{
      header: {
        extend: 'bg-black/20 backdrop-blur shadow',
      },
    }"
  >
    <template #header>
      <h1 class="text-2xl">SenpAutoJson Demo</h1>
    </template>
    <template #content>
      <SenpTab :options="['view', 'edit', 'renderOptions']" v-slot="{ active }">
        <SenpAutoJson
          v-if="active === 'view'"
          :value="JSON.parse(json)"
          :render-as="JSON.parse(renderOptions)"
        ></SenpAutoJson>
        <SenpCodeEditor v-else-if="active === 'edit'" language="json" v-model="json" theme="onedark"></SenpCodeEditor>
        <SenpCodeEditor v-else language="json" v-model="renderOptions" theme="onedark"></SenpCodeEditor>
      </SenpTab>
    </template>
  </SenpLayoutBasic>
</template>

<script setup lang="ts">
const renderOptions = ref(
  JSON.stringify(
    {
      posts: { type: 'expandable', label: 'Posts' },
      avatar: { type: 'image' },
      'posts.media': { type: 'grid' },
    },
    null,
    2
  )
)
const json = ref(
  JSON.stringify(
    {
      username: 'Christine.Boyle',
      avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/471.jpg',
      userID: 'f254dacd-3972-4def-a0bd-e58f53c8587f',
      posts: {
        postID: '9816e898-087d-4ac0-ba3a-b5c9f400cf59',
        media: ['https://loremflickr.com/640/480/nightlife', 'https://loremflickr.com/640/480/sports'],
        content:
          'Sapiente nisi ducimus quo. Alias debitis veniam quo sunt rem. Suscipit amet recusandae doloribus nam. Maiores iusto exercitationem nostrum illum. Sed nostrum blanditiis quis eligendi officiis.',
        timestamp: '2023-02-01T20:46:32.306Z',
      },
    },
    null,
    2
  )
)
</script>
