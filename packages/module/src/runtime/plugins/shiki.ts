import { defineNuxtPlugin } from "#imports";
import { getHighlighter, renderToHtml } from "shiki-es";

export default defineNuxtPlugin(() => {
  const initHighlighter = async () => {
    const highlighter = await getHighlighter({
      theme: "nord",
      langs: [
        "javascript",
        "python",
        "vue",
        "vue-html",
        "html",
        "typescript",
        "bash",
      ],
    });
    return highlighter;
  };

  const renderCustom = async ({
    tokens,
    lang,
    theme,
    options,
  }: {
    tokens: string;
    lang?: string;
    theme?: string;
    // i hate you shiki why cant i do Parameters<AsyncReturnType<typeof initHighlighter>["codeToThemedTokens"]>["3"]
    options?: { includeExplanation?: boolean };
  }) => {
    const highlighter = await initHighlighter();
    const html = renderToHtml(
      highlighter.codeToThemedTokens(tokens, lang, theme, options),
      {
        themeName: theme,
        elements: {
          pre({ children }) {
            return children;
          },
          code({ children }) {
            return children;
          },
        },
      }
    );
    return html;
  };

  return {
    provide: {
      shiki: {
        initHighlighter,
        renderCustom,
      },
    },
  };
});
