import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TestService from 'App/Services/TestService'
import QuestionService from 'App/Services/QuestionService'
import TagService from 'App/Services/TagService'
import CreateTestValidator from 'App/Validators/CreateTestValidator'
import CreateFullTest from 'App/Validators/CreateFullTest'
import RequiredUuidValidator from 'App/Validators/RequiredUuidValidator'
import updateTestValidator from 'App/Validators/updateTestValidator'
import AddTestQuestionsValidator from 'App/Validators/AddTestQuestionsValidator'
import AddTestTagsValidator from 'App/Validators/AddTestTagsValidator'
import SubmitQuestionsValidator from 'App/Validators/SubmitQuestionsValidator'
import Http from '@eduact/ed-http-util'

export default class TestsController {
  public async create({ request, response }: HttpContextContract) {
    const testData = await request.validate(CreateTestValidator)
    const test = await TestService.createTest({ instructor_id: request.user.id, ...testData })
    return Http.respond(response, test, 'Test is created successfully')
  }

  public async addFullTest({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateFullTest)
    const { questions, tags, ...testData } = data
    const test = await TestService.createTest({ instructor_id: request.user.id, ...testData })
    await QuestionService.createMultiply(test.id, request.user.id, questions || [])
    await TagService.createMultiply(test.id, request.user.id, tags || [])
    return Http.respond(response, test, 'Test is created successfully')
  }

  public async getOneTest({ request, response }: HttpContextContract) {
    const { uuid } = await request.validate(RequiredUuidValidator)
    const test = await TestService.findTestByUUID(uuid)
    return Http.respond(response, test || {}, 'Test is retrieved successfully')
  }

  public async getAllTests({ request, response }: HttpContextContract) {
    const { pagination, orderBy, searchQuery, filters, dateRange, tags } = request.only([
      'pagination',
      'orderBy',
      'searchQuery',
      'filters',
      'dateRange',
      'tags',
    ])
    const tests = await TestService.findAllTests({
      pagination,
      orderBy,
      searchQuery,
      filters,
      dateRange,
      tags,
    })
    return Http.respond(
      response,
      tests.data ? tests.data : tests,
      'Tests are retrieved successfully',
      200,
      tests.meta ? tests.meta : null
    )
  }

  public async updateTest({ request, response }: HttpContextContract) {
    const test = await request.validate(updateTestValidator)
    const updatedTest = await TestService.update(test)
    return Http.respond(response, updatedTest, 'Test is updated successfully')
  }

  public async deleteTest({ request, response }: HttpContextContract) {
    const { uuid } = await request.validate(RequiredUuidValidator)
    await TestService.deleteTest(uuid)
    return Http.respond(response, {}, 'Test is deleted successfully')
  }

  public async addQuestion({ request, response }: HttpContextContract) {
    const data = await request.validate(AddTestQuestionsValidator)
    const assignQuestions = await TestService.assignQuestion(data)
    return Http.respond(response, assignQuestions, 'Question is assigned successfully')
  }

  public async addTag({ request, response }: HttpContextContract) {
    const data = await request.validate(AddTestTagsValidator)
    const assignQuestions = await TestService.assignTag(data)
    return Http.respond(response, assignQuestions, 'Tag is assigned successfully')
  }

  public async startTrial({ request, response }: HttpContextContract) {
    const { uuid } = await request.validate(RequiredUuidValidator)
    await TestService.startTrial({ testUUID: uuid, studentId: request.user.id })
    return Http.respond(response, {}, 'Test Started')
  }

  public async submitQuestions({ request, response }: HttpContextContract) {
    const { id, answers } = await request.validate(SubmitQuestionsValidator)
    await TestService.submitQuestions({ trialId: id, studentId: request.user.id, answers })
    return Http.respond(response, {}, 'The answers have been submitted successfully ')
  }
}
