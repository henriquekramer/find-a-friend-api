import {
  Prisma,
  Pet,
  PetAge,
  PetEnergyLevel,
  PetEnvironment,
  PetSize,
} from '@prisma/client'

export interface FindAllParams {
  city: string
  age?: PetAge
  size?: PetSize
  energy_level?: PetEnergyLevel
  environment?: PetEnvironment
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findAll(params: FindAllParams): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
