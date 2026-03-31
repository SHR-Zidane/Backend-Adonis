import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.string('firstname').notNullable()

      // Relation : 1 élève -> 1 classe
      table
        .integer('class_group_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('class_groups')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
