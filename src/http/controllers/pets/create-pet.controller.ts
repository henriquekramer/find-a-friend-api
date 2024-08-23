import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'

const createPetBodySchema = z.object({
  name: z.string(),
  about: z.string(),
  age: z.enum(['PUPPY', 'ADULT', 'SENIOR']),
  size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
  energy_level: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  environment: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
  requirements: z.array(z.string()),
})

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  const org_id = request.user.sub

  try {
    const { pet } = await createPetUseCase.execute({ ...body, org_id })

    return reply.status(201).send(pet)
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    console.error(error)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
