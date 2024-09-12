const fs = require('node:fs')
const fsPromises = require('node:fs/promises')

fs.readdir('.', (err, files) => {
  if (err) {
    console.log('Error al leer el directorio: ', err)
    return
  }

  files.forEach(file => {
    console.log(file)
  })
}
)

fsPromises.stat('content')
fsPromises.readdir('.')
  .then(files => {
    files.forEach(file => {
      console.log(file)
    })
  })
  .catch(err => {
    if (err) {
      console.log('Error al leer el directorio: ', err)
    }
  }
  )
