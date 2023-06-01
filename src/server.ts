import fastify from 'fastify'
import cors from '@fastify/cors'
import { recipesRoutes } from './routes/recipes'

const PORT = 3333

const app = fastify()

app.register(cors, {
  origin: true,
})
app.register(recipesRoutes)

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP server running on http://localhost:${PORT}`)
  })
