<template>
  <div
    :class="
      $senpCx(
        [
          'grid h-full overflow-hidden',
          sidebarRight ? 'grid-cols-[1fr,auto]' : 'grid-cols-[auto,1fr]',
        ].join(' '),
        classes?.wrapper,
      )
    "
  >
    <aside
      v-if="!sidebarRight"
      :class="
        $senpCx(
          'shrink-0 z-20 h-full flex flex-col gap-4 px-4 sticky top-0 min-w-[200px] min-h-full overflow-auto',
          classes?.sidebar,
        )
      "
    >
      <slot name="sidebar" />
    </aside>
    <div
      :class="
        $senpCx(
          'relative h-full w-full grid grid-rows-[auto,1fr,auto] overflow-auto',
          classes?.contentWrapper,
        )
      "
    >
      <header
        :class="
          $senpCx(
            [
              'shrink-0 z-20 h-16 flex items-center gap-4 px-4',
              fixedHeader ? 'sticky top-0' : 'relative',
            ].join(' '),
            classes?.header,
          )
        "
      >
        <slot name="header" />
      </header>
      <main
        :class="
          $senpCx('relative z-10 flex flex-col gap-4 p-4', classes?.content)
        "
      >
        <slot name="content" />
      </main>
      <footer
        :class="
          $senpCx(
            [
              'shrink-0 relative p-4',
              fixedFooter ? 'sticky bottom-0 z-20' : 'relative',
            ].join(' '),
            classes?.footer,
          )
        "
      >
        <slot name="footer" />
      </footer>
    </div>
    <aside
      v-if="sidebarRight"
      :class="
        $senpCx(
          'shrink-0 z-20 h-full flex flex-col gap-4 px-4 sticky top-0 min-w-[200px] min-h-full overflow-auto',
          classes?.sidebar,
        )
      "
    >
      <slot name="sidebar" />
    </aside>
  </div>
</template>

<script setup lang="ts">
import type { SenpCx } from "../plugins/senpCx";

withDefaults(
  defineProps<{
    fixedHeader?: boolean;
    fixedFooter?: boolean;
    sidebarRight?: boolean;
    classes?: {
      wrapper?: SenpCx;
      contentWrapper?: SenpCx;
      header?: SenpCx;
      sidebar?: SenpCx;
      content?: SenpCx;
      footer?: SenpCx;
    };
  }>(),
  {
    fixedHeader: false,
    fixedFooter: false,
    sidebarRight: false,
  },
);
</script>
