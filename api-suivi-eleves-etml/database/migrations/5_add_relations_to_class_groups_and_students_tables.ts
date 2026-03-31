import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected classGroupsTableName = 'class_groups'
  protected studentsTableName = 'students'

  async up() {
    this.schema.alterTable(this.classGroupsTableName, (table) => {
      table
        .integer('teacher_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('teachers')
        .onDelete('SET NULL')
    })

    this.schema.alterTable(this.studentsTableName, (table) => {
      table
        .integer('class_group_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('class_groups')
        .onDelete('SET NULL')
    })
  }

  async down() {
    this.schema.alterTable(this.studentsTableName, (table) => {
      table.dropColumn('class_group_id')
    })

    this.schema.alterTable(this.classGroupsTableName, (table) => {
      table.dropColumn('teacher_id')
    })
  }
}
