import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsByCityUseCase } from './search-pets-by-city'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsByCityUseCase

describe('Search Pets By City Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsByCityUseCase(petsRepository)
  })

  it('should be able to search for pets by city', async () => {
    await petsRepository.create({
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

    await petsRepository.create({
      name: 'Fluffy',
      description: 'A calm cat',
      age: 'ADULT',
      size: 'SMALL',
      energy_level: 'LOW',
      independence_level: 'HIGH',
      environment: 'INDOOR',
      requirements: ['Quiet environment'],
      org: {
        connect: {
          id: 'org-1',
        },
      },
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Buddy' }),
      expect.objectContaining({ name: 'Fluffy' }),
    ])
  })

  it('should be able to filter pets by age', async () => {
    await petsRepository.create({
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

    await petsRepository.create({
      name: 'Fluffy',
      description: 'A calm cat',
      age: 'ADULT',
      size: 'SMALL',
      energy_level: 'LOW',
      independence_level: 'HIGH',
      environment: 'INDOOR',
      requirements: ['Quiet environment'],
      org: {
        connect: {
          id: 'org-1',
        },
      },
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      filters: {
        age: 'YOUNG',
      },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Buddy' }),
    ])
  })
}) 