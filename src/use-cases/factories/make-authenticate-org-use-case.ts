import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repositories'
import { AuthenticateOrgUseCase } from '../authenticate-org'

export function makeAuthenticateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const authenticateOrgUseCase = new AuthenticateOrgUseCase(orgsRepository)

  return authenticateOrgUseCase
}
