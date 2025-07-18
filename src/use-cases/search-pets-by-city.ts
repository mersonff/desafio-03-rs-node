import { PetsRepository, PetFilters } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsByCityUseCaseRequest {
  city: string
  filters?: PetFilters
}

interface SearchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    filters,
  }: SearchPetsByCityUseCaseRequest): Promise<SearchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(city, filters)

    return {
      pets,
    }
  }
} 