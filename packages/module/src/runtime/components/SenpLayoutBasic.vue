<template>
  <div
    :class="
      $senpCx(
        'relative h-full w-full grid grid-rows-[auto,1fr,auto] overflow-auto',
        classes?.wrapper,
      )
    "
  >
    <header
      :class="
        $senpCx(
          [
            'shrink-0 z-30 h-16 flex justify-between items-center gap-4 px-4',
            fixedHeader ? 'sticky top-0' : 'relative',
          ].join(' '),
          classes?.header,
        )
      "
    >
      <slot name="header" />
    </header>
    <main
      v-if="!sidebarLeft && !sidebarRight"
      :class="
        $senpCx('relative z-10 flex flex-col gap-4 p-4', classes?.content)
      "
    >
      <slot name="content" />
    </main>
    <section
      v-else-if="sidebarLeft && sidebarRight"
      :class="
        $senpCx(
          'grid h-full  grid-cols-[auto,1fr,auto]',
          classes?.contentWrapper,
        )
      "
    >
      <aside
        :class="
          $senpCx(
            'shrink-0 z-20 h-full flex flex-col gap-4 px-4 sticky top-0 min-w-[200px] min-h-full overflow-auto',
            classes?.sidebarLeft,
          )
        "
      >
        <slot name="sidebar-left" />
      </aside>
      <main
        :class="
          $senpCx('relative z-10 flex flex-col gap-4 p-4', classes?.content)
        "
      >
        <slot name="content" />
      </main>
      <aside
        :class="
          $senpCx(
            'shrink-0 z-20 h-full flex flex-col gap-4 px-4 sticky top-0 min-w-[200px] min-h-full overflow-auto',
            classes?.sidebarRight,
          )
        "
      >
        <slot name="sidebar-right" />
      </aside>
    </section>
    <section
      v-else-if="sidebarLeft"
      :class="
        $senpCx('grid h-full  grid-cols-[auto,1fr]', classes?.contentWrapper)
      "
    >
      <aside
        :class="
          $senpCx(
            'shrink-0 z-20 h-full flex flex-col gap-4 px-4 sticky top-0 min-w-[200px] min-h-full overflow-auto',
            classes?.sidebarLeft,
          )
        "
      >
        <slot name="sidebar-left" />
      </aside>
      <main
        :class="
          $senpCx('relative z-10 flex flex-col gap-4 p-4', classes?.content)
        "
      >
        <slot name="content" />
      </main>
    </section>
    <section
      v-else-if="sidebarRight"
      :class="
        $senpCx('grid h-full  grid-cols-[1fr,auto]', classes?.contentWrapper)
      "
    >
      <main
        :class="
          $senpCx('relative z-10 flex flex-col gap-4 p-4', classes?.content)
        "
      >
        <slot name="content" />
      </main>
      <aside
        :class="
          $senpCx(
            'shrink-0 z-20 h-full flex flex-col gap-4 px-4 sticky top-0 min-w-[200px] min-h-full overflow-auto',
            classes?.sidebarRight,
          )
        "
      >
        <slot name="sidebar-right" />
      </aside>
    </section>

    <footer
      :class="
        $senpCx(
          [
            'shrink-0 relative p-4',
            fixedFooter ? 'sticky bottom-0 z-30' : 'relative',
          ].join(' '),
          classes?.footer,
        )
      "
    >
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { SenpCx } from "../plugins/senpCx";

withDefaults(
  defineProps<{
    fixedHeader?: boolean;
    fixedFooter?: boolean;
    sidebarLeft?: boolean;
    sidebarRight?: boolean;
    classes?: {
      wrapper?: SenpCx;
      header?: SenpCx;
      content?: SenpCx;
      contentWrapper?: SenpCx;
      sidebarLeft?: SenpCx;
      sidebarRight?: SenpCx;
      footer?: SenpCx;
    };
  }>(),
  {
    fixedHeader: false,
    fixedFooter: false,
    sidebarLeft: false,
    sidebarRight: false,
  },
);
</script>
