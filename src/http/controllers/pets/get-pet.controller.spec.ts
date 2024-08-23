import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrg } from '@tests/factories/make-org-factory'
import { makePet } from '@tests/factories/make-pet-factory'

describe('Get Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get a pet', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({ email: org.email, password: org.password })

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    const getPetResponse = await request(app.server)
      .get(`/pets/${response.body.id}`)
      .set('Authorization', `Bearer ${authResponse.body.token}`)

    expect(getPetResponse.status).toBe(200)
  })
})
