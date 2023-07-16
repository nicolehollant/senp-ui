---
description: Layout with a header, main content, optional side bars, and footer
---

# LayoutBasic

Layout with a header, main content, optional side bars, and footer

---

## Usage

Use `default` slot to render content inside the tag

::ComponentExample
---
is: SenpLayoutBasic
componentClass: border border-gray-700
props:
  sidebarLeft: true
  sidebarRight: true
  classes:
    header:
      extend: border-b border-gray-700
    footer:
      extend: border-t border-gray-700
    sidebarLeft:
      extend: border-r border-gray-700
    sidebarRight:
      extend: border-l border-gray-700
slots: 
  header: <Placeholder class="!h-10 w-full bg-blue-800/40" />
  content: <Placeholder class="bg-pink-800/40" />
  sidebar-left: <Placeholder class="!h-full w-full bg-green-800/40" />
  sidebar-right: <Placeholder class="!h-full w-full bg-yellow-800/40" />
  footer: <Placeholder class="!h-10 w-full bg-red-800/40" />
---
#header
:Placeholder{class="!h-10 w-full bg-blue-800/40"}

#content
:Placeholder{class="bg-pink-800/40"}

#sidebar-left
:Placeholder{class="!h-full bg-green-800/40"}

#sidebar-right
:Placeholder{class="!h-full bg-yellow-800/40"}

#footer
:Placeholder{class="!h-10 w-full bg-red-800/40"}
::

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-layout-basic
initialSlots:
  default: Hello World
---
::