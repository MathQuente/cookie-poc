import { FastifyInstance } from 'fastify'

export async function homeRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const { username } = request.cookies

    if (!username) {
      return reply.code(401).send({ message: 'Please log in' })
    }
    return reply.send({ message: `Welcome back, ${username}` })
  })
}
