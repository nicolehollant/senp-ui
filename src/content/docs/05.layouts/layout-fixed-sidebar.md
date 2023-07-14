---
description: Layout with a header, main content, fixed side bar, and footer
---

# LayoutFixedSidebar

Layout with a header, main content, fixed side bar, and footer

---

## Usage

Use `default` slot to render content inside the tag

::ComponentExample
---
is: SenpLayoutFixedSidebar
componentClass: border border-gray-700
props:
  sidebarRight: false
  classes:
    header:
      extend: border-b border-gray-700
    footer:
      extend: border-t border-gray-700
    sidebar:
      extend: border-x border-gray-700
slots: 
  header: <Placeholder class="!h-10 w-full bg-blue-800/40" />
  content: <Placeholder class="bg-pink-800/40" />
  sidebar: <Placeholder class="!h-full w-full bg-green-800/40" />
  footer: <Placeholder class="!h-10 w-full bg-red-800/40" />
---
#header
:Placeholder{class="!h-10 w-full bg-blue-800/40"}

#content
:Placeholder{class="bg-pink-800/40"}

#sidebar
:Placeholder{class="!h-full bg-green-800/40"}

#footer
:Placeholder{class="!h-10 w-full bg-red-800/40"}
::

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-layout-fixed-sidebar
initialSlots:
  content: Hello World
---
::