import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Question from './Question'
import Answer from './Answer'

export default class Choice extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public question_id: number

  @column()
  public content: string

  @column()
  public correct: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Answer, { foreignKey: 'choice_id' })
  public Answers: HasMany<typeof Answer>

  @belongsTo(() => Question)
  public Question: BelongsTo<typeof Question>
}
