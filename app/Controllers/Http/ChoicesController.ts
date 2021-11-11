import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ChoiceService from 'App/Services/ChoiceService'
import CreateChoiceValidator from 'App/Validators/CreateChoiceValidator'
import RequiredIdValidator from 'App/Validators/RequiredIdValidator'
import updateChoiceValidator from 'App/Validators/updateChoiceValidator'
import Http from '@eduact/ed-http-util'

export default class ChoicesController {
  public async create({ request, response }: HttpContextContract) {
    const choiceData = await request.validate(CreateChoiceValidator)
    const choice = await ChoiceService.createChoice(choiceData)
    return Http.respond(response, choice, 'Choice is created successfully')
  }

  public async getOneChoice({ request, response }: HttpContextContract) {
    const { id } = await request.validate(RequiredIdValidator)
    const choice = await ChoiceService.findChoiceByQuestionId(id)
    return Http.respond(response, choice || {}, 'Choice is retrieved successfully')
  }

  public async updateChoice({ request, response }: HttpContextContract) {
    const choice = await request.validate(updateChoiceValidator)
    const updatedChoice = await ChoiceService.update(choice)
    return Http.respond(response, updatedChoice, 'Choice is updated successfully')
  }

  public async deleteChoice({ request, response }: HttpContextContract) {
    const { id } = await request.validate(RequiredIdValidator)
    await ChoiceService.deleteChoice(id)
    return Http.respond(response, {}, 'Choice is deleted successfully')
  }
}
