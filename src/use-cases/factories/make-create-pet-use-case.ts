import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repositories'
import { CreateOrgUseCase } from '../create-org'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repositories'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const createPetUseCase = new CreatePetUseCase(orgsRepository, petsRepository)

  return createPetUseCase
}
