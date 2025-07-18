import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsByCityUseCase } from '@/use-cases/search-pets-by-city'

export function MakeSearchPetsByCityUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  return new SearchPetsByCityUseCase(prismaPetsRepository)
} 