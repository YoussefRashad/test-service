import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateVideoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    uri: schema.string({ trim: true }, [rules.required()]),
    title: schema.string({ trim: true }, [rules.required()]),
    duration: schema.number([rules.required()]),
  })

  public messages = {
    required: '{{field}} must be required',
  }
}
