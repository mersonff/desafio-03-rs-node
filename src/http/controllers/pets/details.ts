import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PetNotFoundError } from '@/use-cases/errors/pet-not-found-error'
import { MakeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const getPetDetailsParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = getPetDetailsParamsSchema.parse(request.params)

  try {
    const getPetDetailsUseCase = MakeGetPetDetailsUseCase()
    const { pet } = await getPetDetailsUseCase.execute({
      petId,
    })

    return reply.status(200).send({
      pet,
    })
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
} 