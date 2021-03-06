import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TestQuestions extends BaseSchema {
  protected tableName = 'test_questions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('test_id')
        .unsigned()
        .references('tests.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('question_id')
        .unsigned()
        .references('questions.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
