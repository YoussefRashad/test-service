import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Grades extends BaseSchema {
  protected tableName = 'grades'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('uuid')
      table.string('grade')
      table.integer('from')
      table.integer('to')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
