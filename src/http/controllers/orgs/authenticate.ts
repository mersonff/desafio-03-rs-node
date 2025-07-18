import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { MakeAuthenticateOrgUseCase } from '@/use-cases/factories/make-authenticate-org-use-case'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(255),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateOrgUseCase = MakeAuthenticateOrgUseCase()
    const { org } = await authenticateOrgUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {
        role: 'org',
      },
      {
        sign: {
          sub: org.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: 'org',
      },
      {
        sign: {
          sub: org.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }
    throw error
  }
} 