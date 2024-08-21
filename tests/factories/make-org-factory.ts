import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  password?: string
  email?: string
}

export function makeOrg(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    author_name: faker.person.fullName(),
    zip_code: faker.location.zipCode(),
    city: faker.location.city(),
    email: overwrite?.email ?? faker.internet.email(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    name: faker.company.name(),
    neighborhood: faker.location.streetAddress(),
    password: overwrite?.password ?? faker.internet.password(),
    state: faker.location.state(),
    street: faker.location.street(),
    whatsapp: faker.phone.number(),
  }
}
