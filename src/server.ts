import fastify from 'fastify'

const PORT = 3333

const app = fastify()

app.get('/hello', () => {
  return 'Hello world'
})

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP server running on http://localhost:${PORT}`)
  })
