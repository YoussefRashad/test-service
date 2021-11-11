import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateGradesValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    grades: schema.array().members(
      schema.object().members({
        grade: schema.string({ trim: true }, [
          //Distinct values for the payload
          rules.required(),
          rules.unique({ table: 'grades', column: 'grade' }),
        ]), //rules exists
        from: schema.number([rules.required(), rules.unique({ table: 'grades', column: 'from' })]),
        to: schema.number([rules.required(), rules.unique({ table: 'grades', column: 'to' })]),
      })
    ),
  })

  public messages = {
    required: '{{field}} must be required',
  }
}
