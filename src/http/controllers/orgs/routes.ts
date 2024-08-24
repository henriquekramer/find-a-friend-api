import { FastifyInstance } from 'fastify'
import { createOrgController } from './create-org.controller'
import { authenticateOrgController } from './authenticate-org.controller'
import { refresh } from './refresh'
import { fetchNearbyOrgsController } from './fetch-nearby-orgs.controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrgController)
  app.get('/orgs', fetchNearbyOrgsController)
  app.post('/sessions', authenticateOrgController)
  app.patch('/token/refresh', refresh)
}
