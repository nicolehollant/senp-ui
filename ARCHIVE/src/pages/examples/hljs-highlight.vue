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
      <h1 class="text-2xl">Hljs Highlight Demo</h1>
    </template>
    <template #content>
      <div class="flex gap-4">
        <SenpButton @click="() => (mode = 'ts')">TS</SenpButton>
        <SenpButton @click="() => (mode = 'json')">JSON</SenpButton>
      </div>
      <SenpHljsHighlight
        class="bg-neutral-900"
        v-if="mode === 'ts'"
        language="typescript"
        theme="gh-dark"
        :value="tsValue"
        lan
      ></SenpHljsHighlight>
      <SenpHljsHighlight
        class="bg-neutral-900"
        v-else-if="mode === 'json'"
        language="json"
        theme="gh-dark"
        :value="JSON.stringify(jsonValue, null, 2)"
      ></SenpHljsHighlight>
    </template>
  </SenpLayoutBasic>
</template>

<script setup lang="ts">
const mode = ref('ts')
const tsValue = `const jsonValue = [
  {
    id: '61b1b9eb-1264-4059-b712-015750d12ec1',
    type: 'Enabled',
    status: 'In Progress',
    title: 'Multi-channelled disintermediate architecture',
    created: '2023-01-11T22:39:16.743Z',
    assigned: 'Bessie Hayes',
    description:
      'Dignissimos atque distinctio blanditiis. Nesciunt sit molestias atque quis exercitationem. Et excepturi assumenda nisi voluptates occaecati veritatis eligendi in cum.',
  }
]`
const jsonValue = [
  {
    id: '61b1b9eb-1264-4059-b712-015750d12ec1',
    type: 'Enabled',
    status: 'In Progress',
    title: 'Multi-channelled disintermediate architecture',
    created: '2023-01-11T22:39:16.743Z',
    assigned: 'Bessie Hayes',
    description:
      'Dignissimos atque distinctio blanditiis. Nesciunt sit molestias atque quis exercitationem. Et excepturi assumenda nisi voluptates occaecati veritatis eligendi in cum.',
  },
  {
    id: 'dd0c5845-d673-4564-b551-200d6809c008',
    type: 'Feature',
    status: 'In Progress',
    title: 'User-centric bifurcated task-force',
    created: '2023-01-12T08:36:46.207Z',
    assigned: 'Bessie Hayes',
    description:
      'Placeat dolore distinctio mollitia odio est cupiditate officia. At provident laudantium sunt dolor esse rerum dicta repudiandae. Alias temporibus repudiandae iure dolore. Repudiandae debitis omnis. Mollitia architecto pariatur amet. Blanditiis voluptatem ducimus temporibus voluptas necessitatibus magnam.',
  },
  {
    id: '2151740d-a7bc-4adc-9b1f-3b3164d28440',
    type: 'Tech Debt',
    status: 'Verified',
    title: 'Horizontal system-worthy Graphic Interface',
    created: '2023-01-12T01:37:23.212Z',
    assigned: 'Miguel Altenwerth',
    description:
      'Qui sunt doloremque eaque nihil. Fugiat odit reprehenderit harum voluptas veritatis inventore ea. Eaque culpa temporibus temporibus repellat dignissimos maxime ea veniam. Reiciendis voluptatem ratione hic magnam. Dolore sapiente blanditiis iste recusandae voluptates odio nemo.',
  },
  {
    id: 'ff4b3e7b-301e-4138-a88a-8d3c11039922',
    type: 'Feature',
    status: 'Defined',
    title: 'Integrated demand-driven circuit',
    created: '2023-01-12T13:58:57.965Z',
    assigned: 'Bessie Hayes',
    description:
      'Dolore facilis est quaerat nihil velit neque maxime. Aliquam eos fugiat laudantium similique adipisci enim explicabo officia. Accusantium natus nemo ipsam repudiandae maiores optio sint aliquid.',
  },
  {
    id: '45519687-3bd1-48c0-8de2-82178f33c5c6',
    type: 'Feature',
    status: 'In Progress',
    title: 'Open-architected empowering strategy',
    created: '2023-01-12T05:10:54.389Z',
    assigned: 'Miguel Altenwerth',
    description:
      'Veritatis perspiciatis voluptatibus neque praesentium. Modi reprehenderit nisi delectus error illum. Fugit delectus facere necessitatibus ratione magni. Atque quo corporis nulla asperiores minus reprehenderit pariatur est omnis. Reiciendis possimus incidunt at nemo natus quia. Eos blanditiis dignissimos.',
  },
  {
    id: '3a784031-bc3f-4ec2-bbf0-effcda5c6e4f',
    type: 'Feature',
    status: 'Verified',
    title: 'Exclusive 6th generation neural-net',
    created: '2023-01-11T20:32:01.936Z',
    assigned: 'Terrell Little',
    description: 'Numquam blanditiis quae odit quidem eos perspiciatis enim dignissimos. Eveniet doloremque veritatis.',
  },
  {
    id: 'eea83050-93c8-48d0-846c-6232c496a337',
    type: 'Enabled',
    status: 'Defined',
    title: 'Secured 24 hour approach',
    created: '2023-01-12T03:46:41.049Z',
    assigned: 'Bernadette Kreiger',
    description:
      'Quia corporis explicabo numquam eaque dolorum reiciendis. Error velit veritatis delectus porro a. Sit deserunt magni corrupti. Quis laboriosam tempora sint magni modi laudantium non sequi aut. Nulla corrupti nihil atque.',
  },
  {
    id: '44359371-327a-475c-a3b8-6fbb3f442f7a',
    type: 'Feature',
    status: 'Verified',
    title: 'Synchronised interactive installation',
    created: '2023-01-11T23:23:08.036Z',
    assigned: 'Bernadette Kreiger',
    description:
      'Voluptatibus vel libero eveniet temporibus voluptatibus fuga. Totam veniam id placeat impedit. Quo voluptatibus laudantium cum. Architecto velit consectetur saepe quos odit. Expedita placeat voluptas doloribus itaque ex nam error omnis. Nulla cumque ea labore eos quasi debitis.',
  },
  {
    id: 'b6e93919-1ada-4a85-9a51-e0f4ea0d55b0',
    type: 'Tech Debt',
    status: 'In Progress',
    title: 'Self-enabling transitional product',
    created: '2023-01-12T15:26:17.792Z',
    assigned: 'Bennie Waters',
    description:
      'Doloribus possimus id error. Necessitatibus eos officia nisi odio repudiandae adipisci. Odit modi officiis amet cumque fugiat nulla esse minus.',
  },
  {
    id: '99d01d84-36d3-431f-8bd6-bec15b49af56',
    type: 'Tech Debt',
    status: 'Defined',
    title: 'Open-source 3rd generation structure',
    created: '2023-01-12T00:00:53.125Z',
    assigned: 'Bessie Hayes',
    description:
      'Ab sapiente illum veniam repudiandae alias perspiciatis accusamus animi. Repudiandae atque nesciunt quas. Occaecati doloremque cumque omnis vero sequi magni optio doloremque. Maxime harum perferendis saepe quam voluptates odio fugiat quam cupiditate. Quo expedita excepturi modi pariatur aliquam itaque blanditiis voluptatum.',
  },
]
</script>
