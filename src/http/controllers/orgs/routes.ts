import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { create } from './create'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
  app.post('/sessions', authenticate)
}
