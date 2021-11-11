import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Answers extends BaseSchema {
  protected tableName = 'answers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('trial_id')
        .unsigned()
        .references('trials.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('question_id')
        .unsigned()
        .references('questions.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('choice_id')
        .unsigned()
        .references('choices.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.boolean('correct')
      table.string('content')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
