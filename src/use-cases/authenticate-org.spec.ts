import { expect, describe, it, beforeEach } from 'vitest'

import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { makeOrg } from '@tests/factories/make-org-factory'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    const email = 'john@example.com'
    const password = '123456'

    await orgsRepository.create(
      makeOrg({ email, password: await hash(password, 6) }),
    )

    const { org } = await sut.execute({
      email,
      password,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'john.doe2@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'john@example.com'
    const password = '123456'

    await orgsRepository.create(
      makeOrg({ email, password: await hash(password, 6) }),
    )

    await expect(() =>
      sut.execute({
        email,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
