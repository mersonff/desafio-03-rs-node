import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Pet Friends',
      email: 'petfriends@example.com',
      password: '12345678',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      whatsapp: '11999999999',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'petfriends@example.com',
      password: '12345678',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
}) 