import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateTestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    uuid: schema.string({ trim: true }, [rules.required()]),
    slug: schema.string.optional({ trim: true }),
    title: schema.string.optional({ trim: true }),
    type: schema.string.optional({ trim: true }),
    duration: schema.number.optional(),
    duration_unit: schema.string.optional({ trim: true }),
    active: schema.boolean.optional(),
    overall_score: schema.number.optional(),
    passing_score: schema.number.optional(),
    grade: schema.string.optional({ trim: true }),
    max_trials: schema.number.optional(),
  })

  public messages = {}
}
