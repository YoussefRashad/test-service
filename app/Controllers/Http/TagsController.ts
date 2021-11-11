import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Http from '@eduact/ed-http-util'
import message from 'App/Constants/Messages'
import TagService from 'App/Services/TagService'
import RequiredIdValidator from 'App/Validators/RequiredIdValidator'
import CreateTagValidator from 'App/Validators/CreateTagValidator'
import UpdateTagValidator from 'App/Validators/UpdateTagValidator'

export default class TagsController {
  private _tagService = new TagService()

  public async fetch({ request, response }: HttpContextContract) {
    const { pagination, orderBy, searchQuery, filters, dateRange } = request.only([
      'pagination',
      'orderBy',
      'searchQuery',
      'filters',
      'dateRange',
    ])
    const tags = await this._tagService.fetchTags({
      pagination,
      orderBy,
      searchQuery,
      filters,
      dateRange,
    })
    return Http.respond(response, tags.data, message.success.find, 200, tags.meta)
  }

  public async getOne({ request, response }: HttpContextContract) {
    const { id } = await request.validate(RequiredIdValidator)
    const tag = await this._tagService.getTagOrFail('id', id)
    return Http.respond(response, tag, message.success.find)
  }

  public async create({ request, response }: HttpContextContract) {
    const resBody = await request.validate(CreateTagValidator)
    const tag = await this._tagService.createOrFail('name', {
      ...resBody,
      instructorId: request.user.id,
    })
    return Http.respond(response, tag, message.success.create)
  }

  public async update({ request, response }: HttpContextContract) {
    const resBody = await request.validate(UpdateTagValidator)
    const tag = await this._tagService.updateOrFail('id', resBody.id, {
      ...resBody,
      instructorId: request.user.id,
    })
    return Http.respond(response, tag, message.success.update)
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = await request.validate(RequiredIdValidator)
    await this._tagService.deleteOrFail('id', id)
    return Http.respond(response, {}, message.success.delete)
  }
}
