import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ViewService from 'App/Services/ViewService'
import CreateViewValidator from 'App/Validators/CreateViewValidator'
import Http from '@eduact/ed-http-util'
import message from 'App/Constants/Messages'

export default class ViewsController {
  public async create({ request, response }: HttpContextContract) {
    const viewData = await request.validate(CreateViewValidator)
    const view = await ViewService.createView(viewData)
    return Http.respond(response, view, message.success.create)
  }

}
