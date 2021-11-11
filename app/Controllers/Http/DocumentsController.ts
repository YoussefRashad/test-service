import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DocumentService from 'App/Services/DocumentService'
import CreateDocumentValidator from 'App/Validators/CreateDocumentValidator'
import RequiredUuidValidator from 'App/Validators/RequiredUuidValidator'
import updateDocumentValidator from 'App/Validators/updateDocumentValidator'
import Http from '@eduact/ed-http-util'
import message from 'App/Constants/Messages'
import AddDocumentTagsValidator from 'App/Validators/AddDocumentTagsValidator'

export default class DocumentsController {
  public async create({ request, response }: HttpContextContract) {
    const documentData = await request.validate(CreateDocumentValidator)
    const document = await DocumentService.createDocument({...documentData, instructor_id: request.user.id})
    return Http.respond(response, document, message.success.create)
  }

  public async getOneDocument({  request, response }: HttpContextContract) {
    const { uuid } = await request.validate(RequiredUuidValidator)
    const document = await DocumentService.findDocumentByUUID(uuid)
    return Http.respond(response, document || {}, message.success.find)
  }

  public async fetch({ request,response}: HttpContextContract) {
    const { pagination, orderBy, searchQuery, filters, dateRange, tags } = request.only([
      'pagination',
      'orderBy',
      'searchQuery',
      'filters',
      'dateRange',
      'tags'
    ])
    const documents = await DocumentService.fetchDocuments({
      pagination,
      orderBy,
      searchQuery,
      filters,
      dateRange,
      tags
    })
    return Http.respond(response, documents.data ? documents.data : documents, 'documents are retrieved successfully', 200, documents.meta ? documents.meta : null)
  }

  public async updateDocument({  request, response }: HttpContextContract) {
    const document = await request.validate(updateDocumentValidator)
    const updatedDocument = await DocumentService.update({...document, instructor_id: request.user.id})
    return Http.respond(response, updatedDocument, message.success.update)
  }

  public async deleteDocument({  request, response }: HttpContextContract) {
    const { uuid } = await request.validate(RequiredUuidValidator)
    await DocumentService.deleteDocument(uuid)
    return Http.respond(response, {}, message.success.delete)
  }

  public async addTag({ request, response }: HttpContextContract) {
    const data = await request.validate(AddDocumentTagsValidator)
    const assignVideos = await DocumentService.assignTag(data)
    return Http.respond(response, assignVideos, 'Tag is assigned successfully')
  }

}
