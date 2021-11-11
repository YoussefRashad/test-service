import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateTestQuestionsValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    test_id: schema.string({ trim: true }, [rules.required()]),
    question_id: schema.number([rules.required()]),
  })

  public messages = {
    required: '{{field}} must be required',
  }
}
