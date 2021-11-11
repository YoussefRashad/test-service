import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Question from './Question'
import Choice from './Choice'
import Trial from './Trial'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public trial_id: number

  @column()
  public question_id: number

  @column()
  public choice_id: number

  @column()
  public correct: boolean

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Question)
  public Question: BelongsTo<typeof Question>

  @belongsTo(() => Choice)
  public Choice: BelongsTo<typeof Choice>

  @belongsTo(() => Trial)
  public Trial: BelongsTo<typeof Trial>
}
