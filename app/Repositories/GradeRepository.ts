import Grade from 'App/Models/Grade'

export default class GradeRepository {
  public static async createManyGrades(gradeData: Partial<Grade>[]): Promise<Grade[]> {
    return await Grade.createMany(gradeData)
  }

  public static async delete(): Promise<any> {
    return await Grade.query().delete()
  }

  public static async getGrade(score: number): Promise<Grade | null> {
    return await Grade.query().where('from', '<', score).andWhere('to', '>', score).first()
  }
}
