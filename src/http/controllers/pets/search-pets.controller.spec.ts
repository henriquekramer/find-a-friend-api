import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrg } from '@tests/factories/make-org-factory'
import { makePet } from '@tests/factories/make-pet-factory'

describe('Search Pets (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should search pets', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ size: 'LARGE' }))

    const response = await request(app.server)
      .get('/pets')
      .query({ city: org.city })

    const largePetsResponse = await request(app.server)
      .get('/pets')
      .query({ city: org.city, size: 'LARGE' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
    expect(largePetsResponse.body.pets).toHaveLength(1)
  })
})
