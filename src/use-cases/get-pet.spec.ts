import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets'
import { makePet } from '@tests/factories/make-pet-factory'
import { GetPetUseCase } from './get-pet'
import { PetNotFoundError } from './errors/pet-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should to be able to get a pet', async () => {
    const pet = await petsRepository.create(makePet())

    const result = await sut.execute({ id: pet.id })

    expect(result.pet).toEqual(pet)
  })

  it('should not be able to get a non-existing pet', async () => {
    await expect(() => sut.execute({ id: 'invalid' })).rejects.toBeInstanceOf(
      PetNotFoundError,
    )
  })
})
