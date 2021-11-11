import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Video from './Video'


export default class View extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public videoId: number

  @column()
  public studentId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Video)
  public Video: BelongsTo<typeof Video>
}
