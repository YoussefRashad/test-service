import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VideoService from 'App/Services/VideoService'
import CreateVideoValidator from 'App/Validators/CreateVideoValidator'
import RequiredUuidValidator from 'App/Validators/RequiredUuidValidator'
import updateTestValidator from 'App/Validators/updateVideoValidator'
import Http from '@eduact/ed-http-util'
import message from 'App/Constants/Messages'
import AddVideoTagsValidator from 'App/Validators/AddVideoTagsValidator'
export default class VideosController {
  public async create({ request, response }: HttpContextContract) {
    const videoData = await request.validate(CreateVideoValidator)
    const video = await VideoService.createVideo({ ...videoData, instructorId: request.user.id})
    return Http.respond(response, video, message.success.create)
  }

  public async getOneVideo({  request, response }: HttpContextContract) {
    const { uuid } = await request.validate(RequiredUuidValidator)
    const video = await VideoService.findVideoByUUID(uuid)
    return Http.respond(response, video || {}, message.success.find)
  }

  public async fetchVideos({ request, response }: HttpContextContract) {
    const { pagination, orderBy, searchQuery, filters, dateRange, tags } = request.only([
      'pagination',
      'orderBy',
      'searchQuery',
      'filters',
      'dateRange',
      'tags'
    ])
    const videos = await VideoService.fetchVideos({
      pagination,
      orderBy,
      searchQuery,
      filters,
      dateRange,
      tags
    })
    return Http.respond(response, videos.data ? videos.data : videos, 'videos are retrieved successfully', 200, videos.meta ? videos.meta : null)
  }

  public async updateVideo({  request, response }: HttpContextContract) {
    const test = await request.validate(updateTestValidator)
    const updatedTest = await VideoService.update({...test, instructor_id: request.user.id})
    return Http.respond(response, updatedTest, message.success.update)
  }

  public async deleteVideo({  request, response }: HttpContextContract) {
    const { uuid } = await request.validate(RequiredUuidValidator)
    await VideoService.deleteVideo(uuid)
    return Http.respond(response, {}, message.success.delete)
  }

  public async addTag({ request, response }: HttpContextContract) {
    const data = await request.validate(AddVideoTagsValidator)
    const assignVideos = await VideoService.assignTag(data)
    return Http.respond(response, assignVideos, 'Tag is assigned successfully')
  }

}
