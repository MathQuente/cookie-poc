import Fastify from 'fastify'
import { fastifyCookie } from '@fastify/cookie'

import cors from '@fastify/cors'
import * as dotenv from 'dotenv'
import { homeRoutes } from './routes/home'
import { authRoutes } from './routes/auth'

dotenv.config()

const app = Fastify()

app.register(cors, {
  origin: true,
  credentials: true
})

app.register(fastifyCookie, {
  secret: 'process.env.SECRET_JWT_KEY'
})

app.register(homeRoutes)
app.register(authRoutes)

app.listen({ port: 3000 }).then(() => {
  console.log('HTTP server running!')
})
