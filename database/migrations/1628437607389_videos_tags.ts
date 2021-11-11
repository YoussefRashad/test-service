import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class VideosTags extends BaseSchema {
  protected tableName = 'videos_tags'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('video_id').unsigned().references('videos.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('tag_id').unsigned().references('tags.id').onDelete('CASCADE').onUpdate('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
