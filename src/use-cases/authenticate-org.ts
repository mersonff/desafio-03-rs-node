import { compare } from 'bcryptjs'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  org: {
    id: string
    name: string
    email: string
    address: string
    whatsapp: string
  }
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      org: {
        id: org.id,
        name: org.name,
        email: org.email,
        address: org.address,
        whatsapp: org.whatsapp,
      },
    }
  }
} 