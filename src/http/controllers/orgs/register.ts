import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { MakeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
    address: z.string().min(10).max(255),
    whatsapp: z.string().min(10).max(20),
  })

  const { name, email, password, address, whatsapp } = registerBodySchema.parse(request.body)

  try {
    const registerOrgUseCase = MakeRegisterOrgUseCase()
    await registerOrgUseCase.execute({ name, email, password, address, whatsapp })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }

  return reply.status(201).send()
} 