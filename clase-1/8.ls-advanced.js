const fs = require('node:fs/promises')
const path = require('node:path')
const folder = process.argv[2] ?? '.'
const pc = require('picocolors')

async function ls (directory) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch (error) {
    console.log(pc.red(`No se pudo leer el directorio ${folder} !`))
    process.exit(1)
  }

  const filePromises = files.map(async file => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath) // status - informacion del archivo
    } catch (error) {
      console.log(`No se pudo lees el archivo ${filePath}`)
    }

    const fileType = stats.isDirectory() ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()
    return `${pc.bgMagenta(fileType)} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.toString()).padStart(10)} ${pc.yellow(fileModified)} `
  })

  const filesInfo = await Promise.all(filePromises)

  filesInfo.forEach(fileInfo => { console.log(fileInfo) })
}

ls(folder)
