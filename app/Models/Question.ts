import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Choice from './Choice'
import Answer from './Answer'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public instructor_id: number

  @column()
  public score_weight: number

  @column()
  public content: string

  @column()
  public type: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Choice, { foreignKey: 'question_id' })
  public Choices: HasMany<typeof Choice>

  @hasMany(() => Answer, { foreignKey: 'question_id' })
  public Answers: HasMany<typeof Answer>
}
