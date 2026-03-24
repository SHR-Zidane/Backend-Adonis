import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import student from '#models/student'
import { HasMany } from '@adonisjs/lucid/types/relations'

export default class ClassGroup extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => student, {
    foreignKey: 'studentId',
  })
  declare students: HasMany<typeof student>
}