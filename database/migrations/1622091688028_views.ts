import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Views extends BaseSchema {
  protected tableName = 'views'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('video_id').unsigned().notNullable()
      table.foreign('video_id').references('id').inTable('videos').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('student_id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
