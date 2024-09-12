const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 1234
const ditto = require('./pokemon/ditto.json')

app.disable('x-powered-by')

// app.use(express.json())

app.use((req, res, next) => {
  if (req !== 'POST') return next()
  if (req.header['content-type'] !== 'application/json') return next()

  // Solo llegan las request que son POST y que tienen el header Content-Type: application/json
  let body = ''

  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // mutar la request y meter la informacion e el req.body
    req.body = data
    next()
  })
  // trackear la request a la base de datos
  // revisar si el usuario tiene cookies
  // next()
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

// La ultima a la que va a llegar
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT)
