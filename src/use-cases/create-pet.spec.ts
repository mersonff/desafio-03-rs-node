import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Buddy',
      description: 'A friendly golden retriever',
      age: 'YOUNG',
      size: 'LARGE',
      energy_level: 'HIGH',
      independence_level: 'MEDIUM',
      environment: 'BOTH',
      requirements: ['Large space', 'Daily exercise'],
      org_id: 'org-1',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Buddy')
    expect(pet.org_id).toEqual('org-1')
  })
}) 