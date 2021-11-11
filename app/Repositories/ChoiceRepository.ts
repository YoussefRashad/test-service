import Choice from 'App/Models/Choice'
import IUpdateChoice from 'App/Interfaces/IUpdateChoice'
import Helpers from 'App/Helpers/Helpers'
import Question from 'App/Models/Question'

export default class ChoiceRepository {
  public static async create(choiceData: Partial<Choice>): Promise<Choice> {
    return await Choice.create(choiceData)
  }

  public static async createManyChoices(
    question: Question,
    choiceData: Partial<Choice>[]
  ): Promise<Choice[]> {
    return await question.related('Choices').createMany(choiceData)
  }

  public static async getChoiceByQuestionId(questionId: number): Promise<Choice | null> {
    return await Choice.findByOrFail('question_id', questionId)
  }

  public static async update(choiceData: IUpdateChoice): Promise<Choice> {
    return Helpers.findByIdAndUpdate(Choice, choiceData, choiceData.id)
  }

  public static async delete(Choice: Choice | null): Promise<void> {
    return await Choice?.delete()
  }
}
