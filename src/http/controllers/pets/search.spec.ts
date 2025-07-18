import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search for pets by city', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Pet Friends',
      email: 'petfriends@example.com',
      password: '12345678',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      whatsapp: '11999999999',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'petfriends@example.com',
      password: '12345678',
    })

    const token = authResponse.body.token

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Buddy',
        description: 'A friendly golden retriever',
        age: 'YOUNG',
        size: 'LARGE',
        energy_level: 'HIGH',
        independence_level: 'MEDIUM',
        environment: 'BOTH',
        requirements: ['Large space', 'Daily exercise'],
      })

    const response = await request(app.server)
      .get('/pets/search')
      .query({
        city: 'São Paulo',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Buddy',
      }),
    ])
  })
}) 