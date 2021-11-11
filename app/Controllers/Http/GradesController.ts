import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GradeService from 'App/Services/GradeService'
import Http from '@eduact/ed-http-util'
import CreateGradesValidator from 'App/Validators/CreateGradesValidator'
import UpdateGradesValidator from 'App/Validators/UpdateGradesValidator'

export default class ChoicesController {
  public async create({ request, response }: HttpContextContract) {
    const { grades } = await request.validate(CreateGradesValidator)
    const createdGrades = await GradeService.createGrade(grades)
    return Http.respond(response, createdGrades, 'Grades are created successfully')
  }

  public async updateGrades({ request, response }: HttpContextContract) {
    const { grades } = await request.validate(UpdateGradesValidator)
    const updatedGrades = await GradeService.update(grades)
    return Http.respond(response, updatedGrades, 'Grades are updated successfully')
  }
}
