import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repositories'
import { FetchNearbyOrgsUseCase } from '../fetch-nearby-orgs'

export function makeFetchOrgsUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new FetchNearbyOrgsUseCase(orgsRepository)
  return useCase
}
