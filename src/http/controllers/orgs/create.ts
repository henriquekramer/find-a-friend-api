import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'

const createOrgBodySchema = z.object({
  name: z.string(),
  author_name: z.string(),
  email: z.string().email(),
  whatsapp: z.string(),
  password: z.string().min(6),
  zip_code: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const {
    name,
    author_name,
    city,
    email,
    latitude,
    longitude,
    neighborhood,
    password,
    state,
    street,
    whatsapp,
    zip_code,
  } = createOrgBodySchema.parse(request.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  try {
    const { org } = await createOrgUseCase.execute({
      name,
      author_name,
      city,
      email,
      latitude,
      longitude,
      neighborhood,
      password,
      state,
      street,
      whatsapp,
      zip_code,
    })

    return reply.status(201).send(org)
  } catch (error) {
    console.log('🚀 ~ create ~ error:', error)
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
