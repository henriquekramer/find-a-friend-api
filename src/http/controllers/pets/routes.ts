import { FastifyInstance } from 'fastify'

import { createPetController } from './create-pet.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { getPetController } from './get-pet.controller'
import { searchPetsController } from './search-pets.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, createPetController)
  app.get('/pets', searchPetsController)
  app.get('/pets/:id', getPetController)
}
