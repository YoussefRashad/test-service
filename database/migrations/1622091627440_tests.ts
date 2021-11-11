import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tests extends BaseSchema {
  protected tableName = 'tests'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('uuid').notNullable()
      table.string('slug')
      table.integer('instructor_id').unsigned()
      table.string('title')
      table.string('type')
      table.integer('duration')
      table.string('duration_unit')
      table.boolean('active').defaultTo(false)
      table.integer('overall_score')
      table.integer('passing_score')
      table.string('grade')
      table.integer('max_trials')
      table.boolean('show_correct')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
