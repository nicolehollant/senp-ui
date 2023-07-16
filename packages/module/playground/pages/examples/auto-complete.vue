<template>
  <SenpLayoutBasic
    fixed-header
    :classes="{
      header: {
        extend: 'bg-indigo-900/60 backdrop-blur shadow',
      },
      content: {
        extend: 'bg-zinc-900/90',
      },
    }"
  >
    <template #header>
      <h1 class="text-2xl">
        Virtual Scroller Demo
      </h1>
    </template>
    <template #content>
      <SenpAutoComplete
        v-model="search.selected"
        :options="search.options"
      />
      <pre><code>{{ {selected: search.selected } }}</code></pre>
    </template>
  </SenpLayoutBasic>
</template>

<script setup lang="ts">
import { reactive } from "#imports";
const search = reactive({
  selected: {
    label: "-- Select a noun --",
    value: "_",
  },
  options: [
    {
      label: "-- Select a noun --",
      value: "_",
    },
    {
      label: "rugby",
      value: "7c8665b3-ec26-4b88-8991-7a1651d3c7e1",
    },
    {
      label: "mood",
      value: "aaacd882-7ef6-42d9-b08d-76f6cbe6a219",
    },
    {
      label: "disruption",
      value: "5bdc1929-0c91-42c1-8014-31d1c04f1e25",
    },
    {
      label: "eagle",
      value: "3d80dbe0-92fe-4b13-9d31-4158beeca3e6",
    },
    {
      label: "tail",
      value: "10b93c6e-d589-40a1-a64f-1076595d12a1",
    },
    {
      label: "aide",
      value: "b5b57421-7660-4e67-b07b-ae95c94c39ce",
    },
    {
      label: "cobweb",
      value: "2dec3572-3e4c-4260-b517-f14f450aab61",
    },
    {
      label: "cation",
      value: "f8e291c7-3f31-4b43-85ba-785b98504eea",
    },
    {
      label: "pizza",
      value: "fda74e55-af64-461e-8559-6714f229320a",
    },
    {
      label: "punctuation",
      value: "ce86c336-41dc-4977-972b-409f79addc90",
    },
    {
      label: "envy",
      value: "efc2de50-4e26-4ef0-9cac-7afb79979f5b",
    },
    {
      label: "salsa",
      value: "509cef41-38a1-4ee8-8d67-1a8980c37194",
    },
    {
      label: "deep",
      value: "8fb83984-1b20-4748-af8c-1699f30413b0",
    },
    {
      label: "call",
      value: "2fc5f708-ea9d-4dd5-b135-9cfc463f3c82",
    },
    {
      label: "square",
      value: "85721120-862d-4520-b52b-29220b528b85",
    },
    {
      label: "facet",
      value: "bbe090e6-ba28-403b-9dd7-278e1bee229b",
    },
    {
      label: "chipmunk",
      value: "e0095a4b-c252-4889-b280-3a8ca36c58de",
    },
    {
      label: "cockroach",
      value: "5131b401-d18a-48e8-b520-02af29e93a08",
    },
    {
      label: "pint",
      value: "bea0fc20-dc89-4de5-9c9a-0fd2d39edf48",
    },
    {
      label: "terrorist",
      value: "89bd349a-fb14-4c99-83b8-f4788a9af7e3",
    },
    {
      label: "surfboard",
      value: "7b7707f8-02ca-4eb9-99b6-25e93213c40a",
    },
    {
      label: "pitching",
      value: "428b9110-a098-4a96-a3a6-dd35abaa7b20",
    },
    {
      label: "cheer",
      value: "8dd7b033-8de2-490f-8a4b-1e693f00c960",
    },
    {
      label: "daily",
      value: "8202b93e-0163-46b1-9743-4e61463e39a5",
    },
    {
      label: "art",
      value: "cb23c40f-b274-4a18-96a6-87185d4170d4",
    },
    {
      label: "ranger",
      value: "b11577ef-518a-4759-81f6-3b216be381d1",
    },
    {
      label: "thickness",
      value: "40e3d4eb-b027-4b05-ae0d-080b6ba2bafc",
    },
    {
      label: "butcher",
      value: "27444afa-1143-4ee3-9fc6-a5c6caf7d0f4",
    },
    {
      label: "processor",
      value: "4363217f-448f-4094-a36a-ed4687e78922",
    },
    {
      label: "step-brother",
      value: "41ff5332-2dfe-497d-954b-789cf9764351",
    },
    {
      label: "incubation",
      value: "0b7e6110-4808-478a-9cc6-b8ae858e924c",
    },
    {
      label: "marker",
      value: "61c6da3c-6342-492b-a1bb-70e47fb6d406",
    },
    {
      label: "litmus",
      value: "e27454c2-633c-4b1a-b062-6d99963d9f01",
    },
    {
      label: "face",
      value: "021d2b50-e21e-4c14-9bbc-f0bf7be72bc5",
    },
    {
      label: "automation",
      value: "d84d3737-86fd-4f02-9604-31e29e6266a5",
    },
    {
      label: "award",
      value: "a3f7a4c4-18f1-4ed8-8697-fda5fb9fd463",
    },
    {
      label: "sequence",
      value: "90776586-d342-434c-9b93-7f9a38ce78f4",
    },
    {
      label: "tax",
      value: "5a57053e-c593-48ff-9bb1-78c73ba545b4",
    },
    {
      label: "illiteracy",
      value: "a570f2bc-d08a-4baa-bc25-63bc0014f48b",
    },
    {
      label: "cent",
      value: "acd5df99-8f0f-40d3-b006-943f6510ea98",
    },
    {
      label: "cashew",
      value: "5c81534f-b766-4a0d-8140-ac505911c2c9",
    },
    {
      label: "muffin",
      value: "45405ec5-cbe7-4e07-bd46-4f86327ca9f4",
    },
    {
      label: "geology",
      value: "492fab7f-c2bf-4c1b-b903-17da235588e8",
    },
    {
      label: "snorer",
      value: "f64bce28-30c2-4aa1-87d3-0b9205823fcb",
    },
    {
      label: "locker",
      value: "7f8ef94d-fc50-4f05-830c-e64f57f2d456",
    },
    {
      label: "calendar",
      value: "03eb27d8-4cfe-469f-b585-ea9b7e313e4e",
    },
    {
      label: "cultivar",
      value: "6a94899c-ecec-4d0d-ad75-3080a85d824f",
    },
    {
      label: "money",
      value: "06fa0008-ecfa-4289-9ca5-f86f3bc84b51",
    },
    {
      label: "primary",
      value: "86d4dd6b-d8f2-4ac5-9330-ef9fa8b089ef",
    },
    {
      label: "operating",
      value: "f42e8b74-91c9-4e0e-85f0-de81e583d462",
    },
  ],
});
</script>
