import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export const recipesRoutes = async (app: FastifyInstance) => {
  app.get('/recipes', async () => {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    const parsedRecipes = recipes.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      coverUrl: recipe.coverUrl,
      excerpt: recipe.content.substring(0, 115).concat('...'),
    }))

    return parsedRecipes
  })

  app.get('/recipes/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const recipe = await prisma.recipe.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return recipe
  })

  app.post('/recipes', async (request) => {
    const bodySchema = z.object({
      title: z.string(),
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { title, content, coverUrl, isPublic } = bodySchema.parse(
      request.body,
    )

    const recipe = await prisma.recipe.create({
      data: {
        title,
        content,
        coverUrl,
        isPublic,
        userId: 'b535fdf3-c343-4235-9c2a-76c8a3df86bc',
      },
    })

    return recipe
  })

  app.put('/recipes/:id', async (request) => {
    const bodySchema = z.object({
      title: z.string(),
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { title, content, coverUrl, isPublic } = bodySchema.parse(
      request.body,
    )

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const recipe = await prisma.recipe.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        coverUrl,
        isPublic,
      },
    })

    return recipe
  })

  app.delete('/recipes/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.recipe.delete({
      where: {
        id,
      },
    })
  })
}
