export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const { senpUiModuleContains, localModuleContains } = getQuery(event)
  if (senpUiModuleContains) {
    const key = Object.keys(config.rawContent.senpUiModules).find((a) => a.includes(senpUiModuleContains + ''))
    if (key) {
      return { key, value: config.rawContent.senpUiModules[key as keyof typeof config.rawContent.senpUiModules] }
    }
    return { key, error: 'No content found', value: null }
  }
  if (localModuleContains) {
    const key = Object.keys(config.rawContent.localModules).find((a) => a.includes(localModuleContains + ''))
    if (key) {
      return { key, value: config.rawContent.localModules[key as keyof typeof config.rawContent.localModules] }
    }
    return { key, error: 'No content found', value: null }
  }

  return { key: (config.rawContent as any).senpUiModules, senpUiModuleContains, localModuleContains, value: null }
})
