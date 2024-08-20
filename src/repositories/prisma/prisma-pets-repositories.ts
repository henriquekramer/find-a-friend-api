import { prisma } from '@/lib/prisma'
import { Prisma, Pet } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findAll(params: FindAllParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energy_level: params.energy_level,
        environment: params.environment,
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const user = await prisma.pet.create({
      data,
    })

    return user
  }
}
