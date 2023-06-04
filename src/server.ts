import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'

const PORT = 3333

const app = fastify()

app.register(cors, {
  origin: true,
})
app.register(memoriesRoutes)

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP server running on http://localhost:${PORT}`)
  })
