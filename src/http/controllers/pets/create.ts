import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(10).max(500),
    age: z.enum(['PUPPY', 'YOUNG', 'ADULT', 'SENIOR']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    energy_level: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    independence_level: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    environment: z.enum(['INDOOR', 'OUTDOOR', 'BOTH']),
    requirements: z.array(z.string()).min(1),
  })

  const {
    name,
    description,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    requirements,
  } = createPetBodySchema.parse(request.body)

  const createPetUseCase = MakeCreatePetUseCase()
  const { pet } = await createPetUseCase.execute({
    name,
    description,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    requirements,
    org_id: request.user.sub,
  })

  return reply.status(201).send({
    pet,
  })
} 