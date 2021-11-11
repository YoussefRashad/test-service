import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateQuestionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    test_id: schema.number([rules.required()]),
    score_weight: schema.number([rules.required()]),
    content: schema.string({ trim: true }, [rules.required()]),
    type: schema.string({ trim: true }, [rules.required()]),
    choices: schema.array
      .optional()
      .members(
        schema
          .object()
          .members({ content: schema.string({ trim: true }), correct: schema.boolean() })
      ),
  })

  public messages = {
    required: '{{field}} must be required',
  }
}
