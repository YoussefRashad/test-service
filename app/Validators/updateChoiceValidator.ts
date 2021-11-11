import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateChoiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([rules.required()]),
    question_id: schema.number.optional(),
    content: schema.string.optional({ trim: true }),
    correct: schema.boolean.optional(),
  })

  public messages = {}
}
