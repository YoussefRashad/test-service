import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateGradesValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    grades: schema.array().members(
      schema.object().members({
        grade: schema.string({ trim: true }, [rules.required()]),
        from: schema.number([rules.required()]),
        to: schema.number([rules.required()]),
      })
    ),
  })

  public messages = {
    required: '{{field}} must be required',
  }
}
