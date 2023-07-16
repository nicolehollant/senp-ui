<template>
  <SenpAutoForm
    columns="2"
    :model-value="[
      {
        type: 'description',
        text: 'Username will be used to log in or something',
      },
      {
        type: 'text',
        label: 'username',
        key: 'username',
        value: '',
      },
      {
        type: 'separator',
        style: 'line',
      },
      {
        type: 'text',
        label: 'email',
        key: 'email',
        value: '',
      },
      {
        type: 'text',
        label: 'password',
        inputType: 'password',
        key: 'password',
        value: '',
      },
      {
        type: 'separator',
        style: 'space',
      },
      {
        type: 'custom',
        slotName: 'a',
      },
      {
        columnSpan: 1,
        type: 'select',
        options: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
        label: 'favorite color',
        key: 'favoriteColor',
        value: '',
      },
      {
        columnSpan: 1,
        type: 'select',
        options: [
          'sunday',
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
        ],
        label: 'favorite day',
        key: 'favoriteDay',
        value: '',
      },
      {
        type: 'text',
        inputType: 'number',
        label: 'favorite number',
        key: 'favoriteNumber',
        value: '',
        columnSpan: 1,
      },
      {
        type: 'checkbox',
        label: 'accept?',
        key: 'accept',
        value: false,
        columnSpan: 1,
      },
    ]"
    @submit="
      (v) => {
        form = v;
      }
    "
    @submit:object="(v) => (formObj = v)"
  >
    <template #a>
      <div class="col-span-full prose prose-invert px-4 pb-4">
        <h3>Hi there 👋</h3>
        <p>
          You might want to use a custom slot to render some non-form inputs
        </p>
        <ul>
          <li>qr codes</li>
          <li>more detailed text blocks</li>
          <li>images</li>
          <li>etc</li>
        </ul>
      </div>
    </template>
  </SenpAutoForm>
  <SenpHighlight
    :value="JSON.stringify(formObj, null, 2)"
    language="json"
  />
  <SenpHighlight
    :value="JSON.stringify(form, null, 2)"
    language="json"
  />
</template>

<script setup lang="ts">
import { ref } from "#imports";

const form = ref<any[]>([]);
const formObj = ref<any>({});
</script>
