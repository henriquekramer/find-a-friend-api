import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets'
import { makePet } from '@tests/factories/make-pet-factory'
import { SearchPetsUseCase } from './search-pets'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs'
import { makeOrg } from '@tests/factories/make-org-factory'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should to be able to search pets by city', async () => {
    const org = await orgsRepository.create(makeOrg())
    await petsRepository.create(makePet({ org_id: org.id }))
    await petsRepository.create(makePet({ org_id: org.id }))

    const { pets } = await sut.execute({ city: org.city })

    expect(pets).toHaveLength(2)
  })

  it('should be able to search pets by city and age', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_id: org.id, age: 'ADULT' }))
    await petsRepository.create(makePet({ org_id: org.id, age: 'PUPPY' }))

    const { pets } = await sut.execute({ city: org.city, age: 'ADULT' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and size', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_id: org.id, size: 'LARGE' }))

    const { pets } = await sut.execute({ city: org.city, size: 'LARGE' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and energy level', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(
      makePet({ org_id: org.id, energy_level: 'HIGH' }),
    )

    const { pets } = await sut.execute({ city: org.city, energy_level: 'HIGH' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and environment', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(
      makePet({ org_id: org.id, environment: 'LARGE' }),
    )

    await petsRepository.create(
      makePet({ org_id: org.id, environment: 'SMALL' }),
    )

    const { pets } = await sut.execute({ city: org.city, environment: 'SMALL' })

    expect(pets).toHaveLength(1)
  })
})
