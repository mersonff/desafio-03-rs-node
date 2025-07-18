import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '@/use-cases/create-pet'

export function MakeCreatePetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  return new CreatePetUseCase(prismaPetsRepository)
} 