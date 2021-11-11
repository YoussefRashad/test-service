import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import Trial from './Trial'
import Helpers from 'App/Helpers/Helpers'

export default class Grade extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @column()
  public grade: string

  @column()
  public from: number

  @column()
  public to: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Trial, { foreignKey: 'grade_id' })
  public Trials: HasMany<typeof Trial>

  @beforeCreate()
  public static async generateUUID(grade: Grade) {
    grade.uuid = Helpers.generateUUID()
  }
}
