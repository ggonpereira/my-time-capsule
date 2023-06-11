import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const JWT_TOKEN = process.env.JWT_SECRET || Math.random().toString()

const PORT = 3333

const app = fastify()

app.register(cors, {
  origin: true,
})
app.register(authRoutes)
app.register(memoriesRoutes)
app.register(jwt, {
  secret: JWT_TOKEN,
})

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP server running on http://localhost:${PORT}`)
  })
