import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import QuestionService from 'App/Services/QuestionService'
import CreateQuestionValidator from 'App/Validators/CreateQuestionValidator'
import updateQuestionValidator from 'App/Validators/updateQuestionValidator'
import RequiredIdValidator from 'App/Validators/RequiredIdValidator'
import Http from '@eduact/ed-http-util'

export default class QuestionsController {
  public async create({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateQuestionValidator)
    const { test_id, choices, ...questionData } = data
    const question = await QuestionService.createQuestion(
      test_id,
      { instructor_id: request.user.id, ...questionData },
      choices || []
    )
    return Http.respond(response, question, 'Question is created successfully')
  }

  public async getOneQuestion({ request, response }: HttpContextContract) {
    const { id } = await request.validate(RequiredIdValidator)
    const question = await QuestionService.findQuestionByUUID(id)
    return Http.respond(response, question || {}, 'Question is retrieved successfully')
  }

  public async getAllQuestions({ response }: HttpContextContract) {
    const questions = await QuestionService.findAllQuestions()
    return Http.respond(response, questions, 'QuestionS are retrieved successfully')
  }

  public async updateQuestion({ request, response }: HttpContextContract) {
    const question = await request.validate(updateQuestionValidator)
    const updatedQuestion = await QuestionService.update(question)
    return Http.respond(response, updatedQuestion, 'Question is retrieved successfully')
  }

  public async deleteQuestion({ request, response }: HttpContextContract) {
    const { id } = await request.validate(RequiredIdValidator)
    await QuestionService.deleteQuestion(id)
    return Http.respond(response, {}, 'Question is deleted successfully')
  }
}
