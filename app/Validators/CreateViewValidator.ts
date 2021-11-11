import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateViewValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    video_id: schema.number([rules.required()]),
    student_id: schema.number([rules.required()]),
  })

  public messages = {
    required: '{{field}} must be required',
  }
}