import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs'
import { CreateOrgUseCase } from './create-org'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { makeOrg } from '@tests/factories/make-org-factory'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should to be able to create a new org', async () => {
    const { org } = await sut.execute(makeOrg())

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create an org with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute(makeOrg({ email }))

    await expect(() => sut.execute(makeOrg({ email }))).rejects.toBeInstanceOf(
      OrgAlreadyExistsError,
    )
  })

  it('should hash org password upon registration', async () => {
    const password = '123456'
    const { org } = await sut.execute(makeOrg({ password }))

    const isPasswordCorrectlyHashed = await compare(password, org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
