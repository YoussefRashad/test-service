import Trial from 'App/Models/Trial'
// import Helpers from 'App/Helpers/Helpers'

export default class TrialRepository {
  public static async create(trialData: Partial<Trial>): Promise<Trial> {
    return await Trial.create(trialData)
  }

  // public static async getAll(): Promise<Question[]> {
  //   return await Question.all()
  // }

  public static async getTrials(
    //Change name to getTrials
    testId: number,
    studentId: number
  ): Promise<Trial[]> {
    return await Trial.query().where('test_id', testId).andWhere('student_id', studentId)
  }

  public static async getTrialById(id: number): Promise<Trial | null> {
    return await Trial.findBy('id', id)
  }

  public static async getLastTrial(): Promise<Trial | null> {
    return await Trial.query().select('id', 'test_id', 'score').orderBy('id', 'desc').first()
  }

  public static async update(trial: Trial, data: Partial<Trial>): Promise<Trial> {
    trial.merge(data)
    return await trial.save()
  }

  public static async updateMany(
    testId: number,
    studentId: number,
    data: Partial<Trial>
  ): Promise<void> {
    await Trial.query().where('test_id', testId).andWhere('student_id', studentId).update(data)
    return
  }
  //

  // public static async delete(test: Question | null): Promise<void> {
  //   return await test?.delete()
  // }
}
