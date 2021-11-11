import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetOneTestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    uuid: schema.string({ trim: true }, [rules.required()]),
  })

  public messages = {
    required: '{{field}} must be required',
  }
}
