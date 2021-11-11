import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Choices extends BaseSchema {
  protected tableName = 'choices'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('question_id')
        .unsigned()
        .references('questions.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('content')
      table.boolean('correct')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
