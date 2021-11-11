import Answer from 'App/Models/Answer'

export default class AnswerRepository {
  public static async create(answerData: Partial<Answer>): Promise<Answer> {
    return await Answer.create(answerData)
  }
  public static async createMany(data: Partial<Answer>[]): Promise<Answer[]> {
    return await Answer.createMany(data)
  }
}
