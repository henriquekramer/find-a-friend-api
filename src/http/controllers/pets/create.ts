import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

const createPetBodySchema = z.object({
  name: z.string(),
  about: z.string(),
  age: z.enum(['PUPPY', 'ADULT', 'SENIOR']),
  size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
  energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  environment: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
  requirements: z.array(z.string()),
})

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { name, about, age, size, energyLevel, environment, requirements } =
    createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    name,
    about,
    age,
    size,
    energy_level: energyLevel,
    environment,
    requirements,
    org_id: request.user.sub,
  })

  return reply.status(201).send()
}
