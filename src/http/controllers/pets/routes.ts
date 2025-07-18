import { FastifyInstance } from 'fastify'
import { create } from './create'
import { search } from './search'
import { details } from './details'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJwt] }, create)
  app.get('/pets/search', search)
  app.get('/pets/:petId', details)
} 