import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateOrgUseCase } from '@/use-cases/authenticate-org'

export function MakeAuthenticateOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  return new AuthenticateOrgUseCase(prismaOrgsRepository)
} 