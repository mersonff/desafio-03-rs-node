import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 201 on success', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Pet Friends',
      email: 'petfriends@example.com',
      password: '12345678',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      whatsapp: '11999999999',
    })

    expect(response.statusCode).toEqual(201)
  })
}) 