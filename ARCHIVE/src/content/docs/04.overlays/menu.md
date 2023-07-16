---
description: Leave small labels for users to keep content in mind
---

# Menu

You're it!

---

## Usage

Use `default` slot to render content inside the tag

::ComponentExample
---
is: SenpMenu
props:
  side: left
  options: [{"label": "Option A", "emits": "a"},{"label": "Option B", "emits": "b"},{"label": "Option C", "emits": "c"}]
slots:
  trigger: <SenpButton leading="mdi:menu" />
---
#trigger
<SenpButton leading="mdi:menu" />
::

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-menu
initialControls:
  side: left
  options: [{"label": "Option A", "emits": "a"},{"label": "Option B", "emits": "b"},{"label": "Option C", "emits": "c"}]
initialSlots:
  trigger: <SenpButton leading="mdi:menu" />
---
::