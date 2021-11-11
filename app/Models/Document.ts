import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeCreate,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Helpers from 'App/Helpers/Helpers'
import Tag from './Tag';

export default class Document extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @column()
  public title: string

  @column()
  public instructor_id: number

  @column()
  public uri: string

  @column()
  public size: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Tag, {
    localKey: 'id',
    pivotForeignKey: 'document_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'tag_id',
    pivotTable: 'documents_tags',
    pivotTimestamps: true
  })
  public tags: ManyToMany<typeof Tag>

  @beforeCreate()
  public static async generateUUID(document: Document) {
    document.uuid = Helpers.generateUUID()
  }
}
