---
description: Leave small labels for users to keep content in mind
---

# Tag

You're it!

---

## Usage

Use `default` slot to render content inside the tag

::ComponentExample
---
is: SenpTag
defaultSlotContent: Hello World
---
Hello World
::

### Theme

Use the `theme` prop to change the available slots

::ComponentExample
---
is: SenpTag
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
storyName: senp-tag
initialSlots:
  default: Hello World
---
::