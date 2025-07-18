import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrgUseCase } from '@/use-cases/register-org'

export function MakeRegisterOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  return new RegisterOrgUseCase(prismaOrgsRepository)
} 