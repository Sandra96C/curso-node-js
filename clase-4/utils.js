// Como leer un json en ESModule recomendado
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
export const readJSON = (path) =>  require(path)