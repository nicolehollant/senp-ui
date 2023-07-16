---
description: Place content within a card
---

# Card

Brought to you by Hallmark!

---

## Usage

Use `default` slot to render content inside the card

::ComponentExample
---
is: SenpCard
---
:Placeholder
::

### Type

Use the `type` prop to change the available slots

::ComponentExample
---
is: SenpCard
props:
  type: basic
controls:
  type:
    type: string
    options: ['basic', 'header', 'media-top']
slots:
  title: ''
  media: ''
---
:Placeholder

#title
:Placeholder{class="!h-16"}

#media
:Placeholder{class="bg-blue-800"}
::

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-card
initialSlots:
  default: <Placeholder />
  media: <Placeholder class="bg-blue-800" />
  title: <Placeholder class="!h-16" />
---
::