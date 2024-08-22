import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrg } from '@tests/factories/make-org-factory'

describe('Create org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an org', async () => {
    const response = await request(app.server).post('/orgs').send(makeOrg())

    expect(response.statusCode).toEqual(201)
  })
})
