import { PetsRepository } from '@/repositories/pets-repository'
import {
  Pet,
  PetAge,
  PetEnergyLevel,
  PetEnvironment,
  PetSize,
} from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
  age?: PetAge
  size?: PetSize
  energy_level?: PetEnergyLevel
  environment?: PetEnvironment
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    environment,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      size,
      energy_level,
      environment,
    })

    return { pets }
  }
}
