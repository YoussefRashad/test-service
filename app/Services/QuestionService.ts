import TestService from 'App/Services/TestService'
import QuestionRepository from 'App/Repositories/QuestionRepository'
import ChoiceRepository from 'App/Repositories/ChoiceRepository'
import Question from 'App/Models/Question'
import Choice from 'App/Models/Choice'

export default class QuestionService {
  public static async createQuestion(
    testID: number,
    questionData: Partial<Question>,
    choiceData: Partial<Choice>[]
  ): Promise<Question> {
    const test = await TestService.findTestByID(testID)
    const question = await QuestionRepository.create(test, questionData)
    await ChoiceRepository.createManyChoices(question, choiceData)
    return question
  }

  public static async createMultiply(test_id, instructor_id, questions): Promise<Question[]> {
    return await Promise.all(
      questions.map(async (question) => {
        const { choices, ...questionData } = question
        await this.createQuestion(test_id, { instructor_id, ...questionData }, choices || [])
      })
    )
  }

  public static async findQuestionByUUID(ID: number): Promise<Question | null> {
    return await QuestionRepository.getQuestionByUUID(ID)
  }

  public static async findAllQuestions(): Promise<Question[]> {
    return await QuestionRepository.getAll()
  }

  public static async update(questionData): Promise<Question> {
    return await QuestionRepository.update(questionData)
  }

  public static async deleteQuestion(id: number): Promise<void> {
    const questionFound = await this.findQuestionByUUID(id)
    return await QuestionRepository.delete(questionFound)
  }
}
