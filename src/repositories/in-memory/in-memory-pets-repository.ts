import { Pet, Prisma } from '@prisma/client'
import { PetsRepository, PetFilters } from '@/repositories/pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetCreateInput) {
    const pet = {
      id: 'pet-1',
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      requirements: Array.isArray(data.requirements) ? data.requirements : [],
      org_id: data.org?.connect?.id || 'org-1',
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCity(city: string, filters?: PetFilters) {
    let pets = this.items.filter((pet) => {
      // Simular busca por cidade (em um cenário real, isso viria do endereço da org)
      return true
    })

    if (filters?.age) {
      pets = pets.filter((pet) => pet.age === filters.age)
    }

    if (filters?.size) {
      pets = pets.filter((pet) => pet.size === filters.size)
    }

    if (filters?.energy_level) {
      pets = pets.filter((pet) => pet.energy_level === filters.energy_level)
    }

    if (filters?.independence_level) {
      pets = pets.filter(
        (pet) => pet.independence_level === filters.independence_level,
      )
    }

    if (filters?.environment) {
      pets = pets.filter((pet) => pet.environment === filters.environment)
    }

    return pets
  }
} 