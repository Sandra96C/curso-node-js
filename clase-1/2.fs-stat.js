const fs = require('node:fs')

const stats = fs.statSync('./archivo.txt')

console.log(
  stats.isFile(), // es un fichero
  stats.isDirectory(), // es un directorio
  stats.isSymbolicLink(), // si es un enlace simbolico
  stats.size // tamanyo en bytes
)
