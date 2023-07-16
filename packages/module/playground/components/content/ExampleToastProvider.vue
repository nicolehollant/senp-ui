<template>
  <SenpToastProvider />
  <SenpAutoForm
    columns="2"
    :model-value="[
      {
        columnSpan: 1,
        type: 'select',
        options: ['info', 'success', 'warning', 'error'],
        label: 'type',
        key: 'type',
        value: 'info',
      },
      {
        columnSpan: 1,
        type: 'select',
        options: ['top', 'bottom', 'top-right', 'top-left', 'bottom-left', 'bottom-right'],
        label: 'placement',
        key: 'placement',
        value: 'top-right',
      },
      {
        type: 'text',
        inputType: 'text',
        label: 'title',
        key: 'title',
        value: 'hello',
      },
      {
        type: 'text',
        inputType: 'text',
        label: 'content',
        key: 'content',
        value: 'hello world :)',
      },
      {
        type: 'text',
        inputType: 'number',
        label: 'durationMs',
        key: 'durationMs',
        value: '3000',
      },
    ]"
    @submit:object="(v) => $toast.add(v)"
  />
</template>
