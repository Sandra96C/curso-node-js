import express, { json } from 'express' // require -> commonJS
import cors from 'cors' // cuidao perque moltes voltes ho solventa posant un asterisc
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Servidor escuchando http://localhost:${PORT}`)    
})