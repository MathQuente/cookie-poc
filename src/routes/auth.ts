import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', async (request, reply) => {
    const bodySchema = z.object({
      username: z.string().min(3, 'Username must be at least 3 characters')
    })

    const { username } = bodySchema.parse(request.body)

    reply
      .setCookie('username', username, {
        path: '/', // Disponível para todas as rotas
        httpOnly: true, // Protegido contra JavaScript
        secure: true, // Apenas true se usar HTTPS (em produção)
        sameSite: 'none', // Permitir envio entre sites,
        partitioned: true
      })
      .send({ messsage: 'Logged in successfully', username })
  })

  app.post('/logout', async (_, reply) => {
    reply
      .clearCookie('username', { path: '/' })
      .send({ message: 'Logged out successfully' })
  })
}
