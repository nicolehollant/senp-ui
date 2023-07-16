const { resolve, join } = require('path')
const { readdir } = require('fs').promises

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name)
    if (dirent.isDirectory()) {
      yield* getFiles(res)
    } else {
      yield res
    }
  }
}

;(async () => {
  const dir = join(__dirname, 'src/pages')
  for await (const f of getFiles('./src/pages/examples')) {
    const path = f.split(dir)[1].replace('/index', '').replace('.vue', '')
    const link = `<NuxtLink to="${path}"><SenpButton>${path.split('/examples/')[1]}</SenpButton></NuxtLink>`
    console.log(link)
  }
})()
