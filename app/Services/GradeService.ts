import GradeRepository from 'App/Repositories/GradeRepository'
import Grade from 'App/Models/Grade'
import ICreateGrade from 'App/Interfaces/ICreateGrade'
import BadRequestException from 'App/Exceptions/BadRequestException'

export default class GradeService {
  public static async createGrade(gradeData: ICreateGrade[]): Promise<Grade[]> {
    this.validateCreateGrades(gradeData)
    return await GradeRepository.createManyGrades(gradeData)
  }

  public static async deleteGrade(): Promise<void> {
    return await GradeRepository.delete()
  }

  public static async update(gradeData: ICreateGrade[]): Promise<Grade[]> {
    await this.deleteGrade()
    return await this.createGrade(gradeData)
  }

  private static validateCreateGrades(gradeData: ICreateGrade[]): void {
    this.validateGradesRanges(gradeData)
    this.validateGrades(gradeData)

    return
  }

  private static validateGradesRanges(gradeData: ICreateGrade[]): void {
    //Sort
    gradeData.sort((a, b) => a?.from - b?.from)
    //Check Overlap
    for (let i = 1; i < gradeData.length; i++) {
      if (gradeData[i - 1].to >= gradeData[i].from)
        throw new BadRequestException('Overlap occurs between grades ranges')
    }

    return
  }

  private static validateGrades(gradeData: ICreateGrade[]): void {
    const uniqueGrades = new Set(gradeData.map((grade) => grade.grade))
    if (uniqueGrades.size < gradeData.length) throw new BadRequestException('Duplicates Found')

    return
  }
}
