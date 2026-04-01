import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import ClassGroup from './class_group.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Comment from './comment.js'
import { DateTime } from 'luxon'
import User from './user.js'

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare firstname: string

  @column()
  declare email: string

  @column()
  declare userId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => ClassGroup)
  declare classGroups: HasMany<typeof ClassGroup>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
