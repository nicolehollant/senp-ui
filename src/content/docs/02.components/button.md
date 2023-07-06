# Button

It's cute as a button 🥰

---

## Usage

Use `default` slot to render content inside the button

::ComponentExample
---
is: SenpButton
defaultSlotContent: Hello World
---
Hello World
::

Use the `label` prop to render content inside the button

::ComponentExample
---
is: SenpButton
props:
  label: Hello World
---
::

### Size

Use the `size` prop to control the size of the button

::ComponentExample
---
is: SenpButton
ignoreProps:
- label
props:
  size: md
  label: Hello World
controls:
  size:
    type: string
    options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl']
---
Hello World
::

### Intent

Use the `intent` prop to adjust the theme of the button

::ComponentExample
---
is: SenpButton
defaultSlotContent: Hello World
props:
  intent: primary
controls:
  intent:
    type: string
    options: ["primary", "secondary", "destructive", "outline", "ghost", "link"]
---
Hello World
::

### Rounded

Use the `rounded` prop to change up the border radius of your buttons

::ComponentExample
---
is: SenpButton
defaultSlotContent: Hello World
props:
  rounded: md
controls:
  rounded:
    type: string
    options: ["sm", "md", "lg", "full", "none"]
---
Hello World
::

### Disabled

Use the `disabled` prop to disable the button

::ComponentExample
---
is: SenpButton
defaultSlotContent: Hello World
props:
  disabled: true
---
Hello World
::

### Square

Use the `square` prop to ensure that there is even padding all around the button

::ComponentExample
---
is: SenpButton
defaultSlotContent: Hello World
props:
  square: true
---
Hello World
::

### Truncate

Use the `truncate` prop to cut off overflowing content in the button, we recommend combining this with the `block` prop for the padding to be considered

::ComponentExample
---
is: SenpButton
defaultSlotContent: Hello World And Then Some More Text
props:
  truncate: true
  block: true
  classes:
    button: w-20
---
Hello World And Then Some More Text
::

### Icon

Use icons from [Iconify](https://icones.js.org/) in your button with the `leading` and `trailing` props

::ComponentExample
---
is: SenpButton
ignoreProps:
- label
props:
  label: hello
  leading: mdi:information
  trailing: mdi:close
---
::

Don't pass any label content for an icon button

::ComponentExample
---
is: SenpButton
props:
  leading: mdi:account-edit
---
::

Use the `loading` prop in conjunction with th `loadingIcon` prop to show a loading spinner while loading


::ComponentExample
---
is: SenpButton
props:
  loading: true
  loadingIcon: mdi:loading
---
::

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-button
initialControls:
  label: Hello World
---
::