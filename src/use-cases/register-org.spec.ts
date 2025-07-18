import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { RegisterOrgUseCase } from './register-org'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'Pet Friends',
      email: 'petfriends@example.com',
      password: '123456',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      whatsapp: '11999999999',
    })

    expect(org.id).toEqual(expect.any(String))
  }, 10000)

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Pet Friends',
      email: 'petfriends@example.com',
      password: '123456',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      whatsapp: '11999999999',
    })

    expect(org.password_hash).not.toEqual('123456')
    expect(org.password_hash).toEqual(expect.any(String))
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'petfriends@example.com'

    await sut.execute({
      name: 'Pet Friends',
      email,
      password: '123456',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      whatsapp: '11999999999',
    })

    await expect(() =>
      sut.execute({
        name: 'Pet Friends',
        email,
        password: '123456',
        address: 'Rua das Flores, 123 - São Paulo, SP',
        whatsapp: '11999999999',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
}) 