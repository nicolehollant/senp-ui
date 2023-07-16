---
description: Render an avatar with an optional chip indicator
---

# Avatar

The last airbender?

---

## Usage

Render an avatar with an optional chip indicator

::ComponentExample
---
is: SenpAvatar
props:
  src: https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1180.jpg
  alt: My Avatar
---
::

### Alt

Use the `alt` prop for those using screenreaders and as a fallback for your `src` or `seed`. The first two initials will render.

::ComponentExample
---
is: SenpAvatar
props:
  alt: My Avatar
---
::

### Seed

Use the `seed` prop to generate unique avatars without an `src`.

::ComponentExample
---
is: SenpAvatar
props:
  seed: user1
---
::

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-avatar
initialSlots:
  default: Hello World
---
::