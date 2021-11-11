import ChoiceRepository from 'App/Repositories/ChoiceRepository'
import Choice from 'App/Models/Choice'

export default class ChoiceService {
  public static async createChoice(choiceData: Partial<Choice>): Promise<Choice> {
    return await ChoiceRepository.create(choiceData)
  }

  public static async findChoiceByQuestionId(question_id: number): Promise<Choice | null> {
    return await ChoiceRepository.getChoiceByQuestionId(question_id)
  }

  public static async update(choiceData): Promise<Choice> {
    return await ChoiceRepository.update(choiceData)
  }

  public static async deleteChoice(id: number): Promise<void> {
    const choiceFound = await this.findChoiceByQuestionId(id)
    return await ChoiceRepository.delete(choiceFound)
  }
}
