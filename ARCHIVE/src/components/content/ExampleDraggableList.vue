<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="grid gap-4 grid-rows-[auto,minmax(0,1fr)] h-full" v-for="(_, key) in columns">
      <h3 class="text-xl">{{ key }}</h3>
      <SenpDraggableList
        v-model="columns[key]"
        class="flex flex-col gap-2 overflow-auto h-full"
        :classes="{ elementWrapper: { base: 'w-full' } }"
      >
        <template #item="{ element }">
          <SenpCard
            class="cursor-move"
            :classes="{ wrapper: { extend: key === 'Done' ? 'opacity-50 !bg-gray-950' : '' } }"
            :key="element.id"
            type="header"
            :title="element.title"
          >
            <p class="text-sm line-clamp-3">{{ element.description }}</p>
          </SenpCard>
        </template>
      </SenpDraggableList>
    </div>
  </div>
</template>

<script setup lang="ts">
const columns = reactive({
  'In Progress': [
    {
      id: '7d820594-9642-44f3-bc8d-9540e2205f91',
      title: 'Visionary scalable infrastructure',
      description: 'Eveniet a a officiis eum. Aut labore praesentium praesentium. Possimus iusto tenetur.',
    },
    {
      id: 'b5190ec6-980f-4e6e-b5e5-0580ed4b7823',
      title: 'Organized well-modulated info-mediaries',
      description:
        'Quos neque itaque magni placeat ea illo. Amet fugiat nobis placeat doloribus mollitia sapiente. Tempora expedita ratione enim cupiditate architecto aliquam consequatur neque dolore.',
    },
    {
      id: '3e362b96-af3c-4b7d-a181-2bf0fc1f493a',
      title: 'Digitized dynamic function',
      description:
        'Similique doloribus in nihil. Laboriosam illum hic officiis autem saepe accusantium. Dolorum animi rerum quaerat aliquam porro aperiam. Et reprehenderit a doloremque mollitia ex molestias. Temporibus quam corrupti inventore veritatis illo.',
    },
    {
      id: 'eaafb5a8-66bf-431e-9d22-7e06873e1c46',
      title: 'Universal regional archive',
      description:
        'Quod iusto placeat saepe totam id. Minima magnam laboriosam perspiciatis numquam laudantium fugiat excepturi nisi. Sit accusamus eius ad a voluptatem nesciunt repudiandae animi recusandae.',
    },
    {
      id: '9aed9736-5e1a-40b9-a0f9-8ded441cde30',
      title: 'Vision-oriented asynchronous Graphical User Interface',
      description:
        'Nobis dolore reprehenderit sapiente perspiciatis nostrum unde odit ut quo. Libero expedita ea facere accusantium odit neque dicta possimus. Aperiam facere laudantium vitae provident veniam nisi. Quis perspiciatis perspiciatis vitae consequuntur excepturi illum.',
    },
  ],
  Done: [
    {
      id: '23d51e1b-a02b-4c8e-9ed4-3d26e6d7e4e2',
      title: 'Multi-lateral 6th generation product',
      description: 'Similique vero vitae aut magnam. Illo voluptate cumque possimus amet aliquid.',
    },
    {
      id: '18a1d62c-3868-4c8e-b330-5c6c2614aacd',
      title: 'Triple-buffered clear-thinking flexibility',
      description:
        'Quibusdam labore praesentium in ab occaecati numquam ad. Nemo et necessitatibus architecto incidunt pariatur quibusdam voluptatum fuga. Consequuntur repellendus autem cupiditate ipsum nihil. Officia possimus perspiciatis porro nihil autem.',
    },
  ],
})
</script>
