import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    const password = '123456'
    const passwordHash = await hash(password, 10)

    await orgsRepository.create({
      name: 'Pet Friends',
      email: 'petfriends@example.com',
      password_hash: passwordHash,
      address: 'Rua das Flores, 123 - São Paulo, SP',
      whatsapp: '11999999999',
    })

    const { org } = await sut.execute({
      email: 'petfriends@example.com',
      password,
    })

    expect(org.id).toEqual(expect.any(String))
  }, 10000)

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const passwordHash = await hash('123456', 10)

    await orgsRepository.create({
      name: 'Pet Friends',
      email: 'petfriends@example.com',
      password_hash: passwordHash,
      address: 'Rua das Flores, 123 - São Paulo, SP',
      whatsapp: '11999999999',
    })

    await expect(() =>
      sut.execute({
        email: 'petfriends@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
}) 