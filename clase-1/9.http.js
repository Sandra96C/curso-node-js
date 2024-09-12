const http = require('node:http') // protocolo http
const { findAvailablePort } = require('./10.free-port')
const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('hola mundo')
})

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})

// No recomendable en produccion
// server.listen(0, () => {
//   console.log(`SERVER LISTENING ON PORT http://localhost:${server.address().port}`)
// })
