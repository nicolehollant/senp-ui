<template>
  <div
    :class="
      $xClass(
        ['grid h-full overflow-hidden', sidebarRight ? 'grid-cols-[1fr,auto]' : 'grid-cols-[auto,1fr]'].join(' '),
        classes?.wrapper
      )
    "
  >
    <aside
      v-if="!sidebarRight"
      :class="
        $xClass(
          'shrink-0 z-20 h-full flex flex-col gap-4 px-4 sticky top-0 min-w-[200px] min-h-full overflow-auto',
          classes?.sidebar
        )
      "
    >
      <slot name="sidebar"></slot>
    </aside>
    <div
      :class="$xClass('relative h-full w-full grid grid-rows-[auto,1fr,auto] overflow-auto', classes?.contentWrapper)"
    >
      <header
        :class="
          $xClass(
            ['shrink-0 z-20 h-16 flex items-center gap-4 px-4', fixedHeader ? 'sticky top-0' : 'relative'].join(' '),
            classes?.header
          )
        "
      >
        <slot name="header" />
      </header>
      <main :class="$xClass('relative z-10 flex flex-col gap-4 p-4', classes?.content)">
        <slot name="content" />
      </main>
      <footer
        :class="
          $xClass(
            ['shrink-0 relative p-4', fixedFooter ? 'sticky bottom-0 z-20' : 'relative'].join(' '),
            classes?.footer
          )
        "
      >
        <slot name="footer" />
      </footer>
    </div>
    <aside
      v-if="sidebarRight"
      :class="
        $xClass(
          'shrink-0 z-20 h-full flex flex-col gap-4 px-4 sticky top-0 min-w-[200px] min-h-full overflow-auto',
          classes?.sidebar
        )
      "
    >
      <slot name="sidebar"></slot>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { XClass } from '../plugins/xClass'

withDefaults(
  defineProps<{
    fixedHeader: boolean
    fixedFooter: boolean
    sidebarRight: boolean
    classes?: {
      wrapper?: XClass
      contentWrapper?: XClass
      header?: XClass
      sidebar?: XClass
      content?: XClass
      footer?: XClass
    }
  }>(),
  {
    fixedHeader: false,
    fixedFooter: false,
    sidebarRight: false,
  }
)
</script>
