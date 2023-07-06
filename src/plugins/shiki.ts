import { getHighlighter, renderToHtml } from 'shiki-es'
import { AsyncReturnType } from '../types/types'

export default defineNuxtPlugin(() => {
  const initHighlighter = async () => {
    const highlighter = await getHighlighter({
      theme: 'nord',
      langs: ['javascript', 'python', 'vue', 'vue-html', 'html', 'typescript'],
    })
    return highlighter
  }

  const renderCustom = async ({
    tokens,
    lang,
    theme,
    options,
  }: {
    tokens: string
    lang?: string
    theme?: string
    options?: Parameters<AsyncReturnType<typeof initHighlighter>['codeToThemedTokens']>['3']
  }) => {
    const highlighter = await initHighlighter()
    const html = renderToHtml(highlighter.codeToThemedTokens(tokens, lang, theme, options), {
      themeName: theme,
      elements: {
        pre({ children }) {
          return children
        },
        code({ children }) {
          return children
        },
      },
    })
    return html
  }

  return {
    provide: {
      shiki: {
        initHighlighter,
        renderCustom,
      },
    },
  }
})
