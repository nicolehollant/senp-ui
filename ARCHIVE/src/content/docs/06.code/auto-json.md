---
description: Automatically render something reasonable from JSON
---

# AutoJson

I hate `<pre><code></code></pre>`!! I hate `<pre><code></code></pre>`!!

---

## Usage

Pass a JSON object in to the `value` prop to be rendered. Pass `renderingOptions` to configure the appearance.

::ComponentExample
---
is: ExampleAutoJson
---
#code
```vue
<template>
  <SenpAutoJson
    :value="{
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
    }"
    :render-as="{
      posts: { type: 'expandable', label: 'Posts' },
      avatar: { type: 'image' },
      'posts.media': { type: 'grid' },
    }"
  ></SenpAutoJson>
</template>
```
::

### Theme

Use the `theme` prop to change the available slots

::ComponentExample
---
is: SenpAutoJson
defaultSlotContent: Hello World
props:
  theme: primary
controls:
  theme:
    type: string
    options: ['primary', 'success', 'neutral', 'error']
---
Hello World
::

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-auto-json
initialControls:
  value: {"username":"Christine.Boyle","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/471.jpg","userID":"f254dacd-3972-4def-a0bd-e58f53c8587f","posts":{"postID":"9816e898-087d-4ac0-ba3a-b5c9f400cf59","media":["https://loremflickr.com/640/480/nightlife","https://loremflickr.com/640/480/sports"],"content":"Sapiente nisi ducimus quo. Alias debitis veniam quo sunt rem. Suscipit amet recusandae doloribus nam. Maiores iusto exercitationem nostrum illum. Sed nostrum blanditiis quis eligendi officiis.","timestamp":"2023-02-01T20:46:32.306Z"}}
  renderAs: {"posts":{"type":"expandable","label":"Posts"},"avatar":{"type":"image"},"posts.media":{"type":"grid"}}
---
::