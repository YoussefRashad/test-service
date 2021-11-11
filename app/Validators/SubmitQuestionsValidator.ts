import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubmitQuestionsValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([rules.required()]),
    answers: schema.array().members(
      schema.object().members({
        question_id: schema.number([rules.required()]),
        choice_id: schema.number([rules.required()]),
      })
    ),
  })

  public messages = {
    required: '{{field}} must be required',
  }
}
