import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const querySchema = z.object({
  city: z.string(),
  age: z.enum(['PUPPY', 'ADULT', 'SENIOR']).optional(),
  size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
  energy_level: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  environment: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
})

export async function searchPetsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { city, age, size, energy_level, environment } = querySchema.parse(
    request.query,
  )
  const searchPetsUseCase = makeSearchPetsUseCase()

  try {
    const { pets } = await searchPetsUseCase.execute({
      city,
      age,
      size,
      energy_level,
      environment,
    })

    return reply.status(200).send({ pets })
  } catch (error) {
    console.error(error)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
