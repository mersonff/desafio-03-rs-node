import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { PetNotFoundError } from './errors/pet-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get pet details', async () => {
    const createdPet = await petsRepository.create({
      name: 'Buddy',
      description: 'A friendly golden retriever',
      age: 'YOUNG',
      size: 'LARGE',
      energy_level: 'HIGH',
      independence_level: 'MEDIUM',
      environment: 'BOTH',
      requirements: ['Large space', 'Daily exercise'],
      org: {
        connect: {
          id: 'org-1',
        },
      },
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.name).toEqual('Buddy')
    expect(pet.description).toEqual('A friendly golden retriever')
  })

  it('should not be able to get pet details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
}) 