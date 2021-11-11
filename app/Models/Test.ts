import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
  beforeCreate,
} from '@ioc:Adonis/Lucid/Orm'
import Helpers from 'App/Helpers/Helpers'
import Trial from './Trial'
import Question from './Question'
import Tag from './Tag'

export default class Test extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @column()
  public slug: string

  @column()
  public instructor_id: number

  @column()
  public title: string

  @column()
  public type: string

  @column()
  public duration: number

  @column()
  public duration_unit: string

  @column()
  public active: boolean

  @column()
  public overall_score: number

  @column()
  public passing_score: number

  @column()
  public grade: string

  @column()
  public max_trials: number

  @column()
  public show_correct: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Trial, { foreignKey: 'test_id' })
  public Trials: HasMany<typeof Trial>

  @manyToMany(() => Question, {
    localKey: 'id',
    pivotForeignKey: 'test_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'question_id',
    pivotTable: 'test_questions',
    pivotTimestamps: true,
  })
  public questions: ManyToMany<typeof Question>

  @manyToMany(() => Tag, {
    localKey: 'id',
    pivotForeignKey: 'test_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'tag_id',
    pivotTable: 'test_tags',
    pivotTimestamps: true,
  })
  public tags: ManyToMany<typeof Tag>

  @beforeCreate()
  public static async generateUUID(test: Test) {
    test.uuid = Helpers.generateUUID()
  }
}
