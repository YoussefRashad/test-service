import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateFullTest {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    slug: schema.string({ trim: true }, [rules.required()]),
    title: schema.string({ trim: true }, [rules.required()]),
    type: schema.string({ trim: true }, [rules.required()]),
    duration: schema.number([rules.required()]),
    duration_unit: schema.string({ trim: true }, [rules.required()]),
    active: schema.boolean([rules.required()]),
    overall_score: schema.number([rules.required()]),
    passing_score: schema.number([rules.required()]),
    grade: schema.string({ trim: true }, [rules.required()]),
    max_trials: schema.number([rules.required()]),
    questions: schema.array.optional().members(
      schema.object.optional().members({
        score_weight: schema.number([rules.required()]),
        content: schema.string({ trim: true }, [rules.required()]),
        type: schema.string({ trim: true }, [rules.required()]),
        choices: schema
          .array()
          .members(
            schema
              .object()
              .members({ content: schema.string({ trim: true }), correct: schema.boolean() })
          ),
      })
    ),
    tags: schema.array.optional().members(
      schema.object.optional().members({
        name: schema.string({ trim: true }, [rules.required()]),
      })
    ),
  })

  public messages = {
    required: '{{field}} must be required',
  }
}
