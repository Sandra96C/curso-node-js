import { readFile } from 'node:fs/promises'

// Mas rapido peroooo
Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(
  ([text, secondText]) => {
    console.log('Primer texto:', text)
    console.log('Segundo texto:', secondText)
  }
)
