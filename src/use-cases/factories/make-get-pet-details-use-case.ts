import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetDetailsUseCase } from '@/use-cases/get-pet-details'

export function MakeGetPetDetailsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  return new GetPetDetailsUseCase(prismaPetsRepository)
} 