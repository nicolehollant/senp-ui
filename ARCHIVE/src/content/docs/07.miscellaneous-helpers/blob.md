---
description: Render a random SVG blob
---

# Blob

It's alive 😱

---

## Usage

::ComponentExample
---
is: SenpBlob
componentClass: w-32 mx-auto
props:
  numPoints: 6
  speed: 0.01
  stationary: false
  animationMode: fast
controls:
  animationMode:
    type: string
    options: ["slow", "fast"]
---
::


<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-blob
initialControls:
  class: w-32 mx-auto
---
::