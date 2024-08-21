import { PetEnergyLevel, PetAge, PetSize, PetEnvironment } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

interface Overwrite {
  org_id?: string
  age?: PetAge
  size?: PetSize
  energy_level?: PetEnergyLevel
  environment?: PetEnvironment
}

export const makePet = (overwrite?: Overwrite) => {
  return {
    id: randomUUID(),
    name: faker.animal.dog(),
    about: faker.lorem.lines(3),
    age:
      overwrite?.age ??
      (faker.helpers.arrayElement(['PUPPY', 'ADULT', 'SENIOR']) as PetAge),
    size:
      overwrite?.size ??
      (faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']) as PetSize),
    energy_level:
      overwrite?.energy_level ??
      (faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH']) as PetEnergyLevel),
    environment:
      overwrite?.environment ??
      (faker.helpers.arrayElement([
        'SMALL',
        'MEDIUM',
        'LARGE',
      ]) as PetEnvironment),
    requirements: [faker.lorem.word()],
    org_id: overwrite?.org_id ?? randomUUID(),
  }
}
