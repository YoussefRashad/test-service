import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateTagValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([rules.required()]),
    name: schema.string.optional({ trim: true }, [rules.required()]),
  })

  public messages = {
    required: '{{field}} must be required',
  }
}
