import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  create: (data: Prisma.PetCreateInput) => Promise<Pet>
  findById: (id: string) => Promise<Pet | null>
  findManyByCity: (city: string, filters?: PetFilters) => Promise<Pet[]>
}

export interface PetFilters {
  age?: string
  size?: string
  energy_level?: string
  independence_level?: string
  environment?: string
} 