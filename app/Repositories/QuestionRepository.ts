import Question from 'App/Models/Question'
import IUpdateQuestion from 'App/Interfaces/IUpdateQuestion'
import Helpers from 'App/Helpers/Helpers'
import Test from 'App/Models/Test'

export default class QuestionRepository {
  public static async create(test: Test, questionData: Partial<Question>): Promise<Question> {
    return await test.related('questions').create(questionData)
  }

  public static async getAll(): Promise<Question[]> {
    return await Question.all()
  }

  public static async getQuestionByUUID(ID: number): Promise<Question | null> {
    return await Question.findByOrFail('id', ID)
  }
  public static async getQuestionChoices(id: number): Promise<any> {
    // return Question.query().where('id', id).preload('Choices').first()
    const question = await Question.find(id)
    //Remove pojo()
    return await question?.related('Choices').query()
  }

  public static async update(questionData: IUpdateQuestion): Promise<Question> {
    return Helpers.findByIdAndUpdate(Question, questionData, questionData.id)
  }

  public static async delete(test: Question | null): Promise<void> {
    return await test?.delete()
  }
}
