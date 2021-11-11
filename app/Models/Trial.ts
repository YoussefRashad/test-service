import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Test from './Test'
import Answer from './Answer'
import Grade from './Grade'

export default class Trial extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public student_id: number

  @column()
  public test_id: number

  @column()
  public status: string

  @column()
  public score: number

  @column()
  public grade_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Answer, { foreignKey: 'trial_id' })
  public Answers: HasMany<typeof Answer>

  @belongsTo(() => Test)
  public Test: BelongsTo<typeof Test>

  @belongsTo(() => Grade)
  public Grade: BelongsTo<typeof Grade>
}
