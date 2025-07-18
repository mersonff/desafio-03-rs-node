import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeSearchPetsByCityUseCase } from '@/use-cases/factories/make-search-pets-by-city-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string().min(2).max(100),
    age: z.enum(['PUPPY', 'YOUNG', 'ADULT', 'SENIOR']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    energy_level: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    independence_level: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    environment: z.enum(['INDOOR', 'OUTDOOR', 'BOTH']).optional(),
  })

  const { city, ...filters } = searchPetsQuerySchema.parse(request.query)

  const searchPetsByCityUseCase = MakeSearchPetsByCityUseCase()
  const { pets } = await searchPetsByCityUseCase.execute({
    city,
    filters,
  })

  return reply.status(200).send({
    pets,
  })
} 