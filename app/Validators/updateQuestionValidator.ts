import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateTestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([rules.required()]),
    test_id: schema.string.optional({ trim: true }),
    score_weight: schema.number.optional(),
    content: schema.string.optional({ trim: true }),
    type: schema.string.optional({ trim: true }),
  })

  public messages = {}
}
