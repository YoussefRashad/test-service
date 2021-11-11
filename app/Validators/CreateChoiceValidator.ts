import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateTestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    question_id: schema.number([rules.required()]),
    content: schema.string({ trim: true }, [rules.required()]),
    correct: schema.boolean([rules.required()]),
  })

  public messages = {
    required: '{{field}} must be required',
  }
}
