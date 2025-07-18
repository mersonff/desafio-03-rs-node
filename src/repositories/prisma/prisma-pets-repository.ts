import { prisma } from '@/lib/prisma'
import { Prisma, Pet } from '@prisma/client'
import { PetsRepository, PetFilters } from '@/repositories/pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })
    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        org: {
          select: {
            name: true,
            address: true,
            whatsapp: true,
          },
        },
      },
    })

    return pet
  }

  async findManyByCity(city: string, filters?: PetFilters): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          address: {
            contains: city,
            mode: 'insensitive',
          },
        },
        ...(filters?.age && { age: filters.age }),
        ...(filters?.size && { size: filters.size }),
        ...(filters?.energy_level && { energy_level: filters.energy_level }),
        ...(filters?.independence_level && { independence_level: filters.independence_level }),
        ...(filters?.environment && { environment: filters.environment }),
      },
      include: {
        org: {
          select: {
            name: true,
            address: true,
            whatsapp: true,
          },
        },
      },
    })

    return pets
  }
} 