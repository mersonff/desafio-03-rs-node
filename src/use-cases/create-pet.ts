import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: string
  size: string
  energy_level: string
  independence_level: string
  environment: string
  requirements: string[]
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    requirements,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      requirements,
      org: {
        connect: {
          id: org_id,
        },
      },
    })

    return {
      pet,
    }
  }
} 