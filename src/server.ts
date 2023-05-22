import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const PORT = 3333

const app = fastify()
const prisma = new PrismaClient()

app.get('/hello', async () => {
  const users = await prisma.user.findMany()
  return JSON.stringify(users)
})

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP server running on http://localhost:${PORT}`)
  })
