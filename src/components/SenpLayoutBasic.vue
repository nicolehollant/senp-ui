<template>
  <div :class="$xClass('relative h-full w-full grid grid-rows-[auto,1fr,auto] overflow-auto', classes?.wrapper)">
    <header
      :class="
        $xClass(
          [
            'shrink-0 z-30 h-16 flex justify-between items-center gap-4 px-4',
            fixedHeader ? 'sticky top-0' : 'relative',
          ].join(' '),
          classes?.header
        )
      "
    >
      <slot name="header" />
    </header>
    <main
      v-if="!sidebarLeft && !sidebarRight"
      :class="$xClass('relative z-10 flex flex-col gap-4 p-4', classes?.content)"
    >
      <slot name="content" />
    </main>
    <section
      :class="$xClass('grid h-full  grid-cols-[auto,1fr,auto]', classes?.contentWrapper)"
      v-else-if="sidebarLeft && sidebarRight"
    >
      <aside
        :class="
          $xClass(
            'shrink-0 z-20 h-full flex flex-col gap-4 px-4 sticky top-0 min-w-[200px] min-h-full overflow-auto',
            classes?.sidebarLeft
          )
        "
      >
        <slot name="sidebar-left" />
      </aside>
      <main :class="$xClass('relative z-10 flex flex-col gap-4 p-4', classes?.content)">
        <slot name="content" />
      </main>
      <aside
        :class="
          $xClass(
            'shrink-0 z-20 h-full flex flex-col gap-4 px-4 sticky top-0 min-w-[200px] min-h-full overflow-auto',
            classes?.sidebarRight
          )
        "
      >
        <slot name="sidebar-right" />
      </aside>
    </section>
    <section :class="$xClass('grid h-full  grid-cols-[auto,1fr]', classes?.contentWrapper)" v-else-if="sidebarLeft">
      <aside
        :class="
          $xClass(
            'shrink-0 z-20 h-full flex flex-col gap-4 px-4 sticky top-0 min-w-[200px] min-h-full overflow-auto',
            classes?.sidebarLeft
          )
        "
      >
        <slot name="sidebar-left" />
      </aside>
      <main :class="$xClass('relative z-10 flex flex-col gap-4 p-4', classes?.content)">
        <slot name="content" />
      </main>
    </section>
    <section :class="$xClass('grid h-full  grid-cols-[1fr,auto]', classes?.contentWrapper)" v-else-if="sidebarRight">
      <main :class="$xClass('relative z-10 flex flex-col gap-4 p-4', classes?.content)">
        <slot name="content" />
      </main>
      <aside
        :class="
          $xClass(
            'shrink-0 z-20 h-full flex flex-col gap-4 px-4 sticky top-0 min-w-[200px] min-h-full overflow-auto',
            classes?.sidebarRight
          )
        "
      >
        <slot name="sidebar-right" />
      </aside>
    </section>

    <footer
      :class="
        $xClass(['shrink-0 relative p-4', fixedFooter ? 'sticky bottom-0 z-30' : 'relative'].join(' '), classes?.footer)
      "
    >
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { XClass } from '../plugins/xClass'

withDefaults(
  defineProps<{
    fixedHeader?: boolean
    fixedFooter?: boolean
    sidebarLeft?: boolean
    sidebarRight?: boolean
    classes?: {
      wrapper?: XClass
      header?: XClass
      content?: XClass
      contentWrapper?: XClass
      sidebarLeft?: XClass
      sidebarRight?: XClass
      footer?: XClass
    }
  }>(),
  {
    fixedHeader: false,
    fixedFooter: false,
    sidebarLeft: false,
    sidebarRight: false,
  }
)
</script>
