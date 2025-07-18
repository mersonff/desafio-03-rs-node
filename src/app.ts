import fastify from 'fastify'
import { orgsRoutes } from '@/http/controllers/orgs/routes'
import { petsRoutes } from '@/http/controllers/pets/routes'
import { ZodError } from 'zod'
import { env } from '@/env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.APP_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Send error to Datadog
  }

  return reply.status(500).send({ message: 'Internal server error.' })
}) 