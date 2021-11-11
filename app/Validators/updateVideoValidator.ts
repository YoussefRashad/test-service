import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateTestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    uuid: schema.string({ trim: true }, [rules.required()]),
    type: schema.string.optional({ trim: true }),
    uri: schema.string.optional({ trim: true }),
    title: schema.string.optional({ trim: true }),
    duration: schema.number.optional(),
  })

  public messages = {}
}
