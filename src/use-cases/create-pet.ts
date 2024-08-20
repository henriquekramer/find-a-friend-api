import {
  Pet,
  PetAge,
  PetEnergyLevel,
  PetEnvironment,
  PetSize,
} from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: PetAge
  size: PetSize
  energy_level: PetEnergyLevel
  environment: PetEnvironment
  requirements: string[]
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    environment,
    requirements,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      environment,
      requirements,
      org_id,
    })

    return { pet }
  }
}
