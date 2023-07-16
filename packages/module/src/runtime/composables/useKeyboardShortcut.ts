import { onMounted, onUnmounted } from "#imports";

export function useKeyboardShortcut(options: {
  key: string;
  meta?: boolean;
  alt?: boolean;
  ctrl?: boolean;
  shift?: boolean;
  onKeyDown: () => void;
}) {
  const listener = (e: KeyboardEvent) => {
    if (
      e.key === options.key &&
      (options?.meta ? e.metaKey : true) &&
      (options?.shift ? e.shiftKey : true) &&
      (options?.alt ? e.altKey : true) &&
      (options?.ctrl ? e.ctrlKey : true)
    ) {
      options.onKeyDown();
    }
  };
  onMounted(() => {
    document.addEventListener("keydown", listener);
  });

  onUnmounted(() => {
    document.removeEventListener("keydown", listener);
  });
}
