import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  beforeCreate,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Helpers from 'App/Helpers/Helpers'
import View from './View'
import Tag from './Tag';

export default class Video extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @column()
  public instructorId: number

  @column()
  public uri: string

  @column()
  public title: string

  @column()
  public duration: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => View)
  public Views: HasMany<typeof View>

  @manyToMany(() => Tag, {
    localKey: 'id',
    pivotForeignKey: 'video_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'tag_id',
    pivotTable: 'videos_tags',
    pivotTimestamps: true
  })
  public tags: ManyToMany<typeof Tag>

  @beforeCreate()
  public static async generateUUID(video: Video) {
    video.uuid = Helpers.generateUUID()
  }
}
