import factory from '@adonisjs/lucid/factories'
import ClassGroup from '#models/class_group'

export const ClassGroupFactory = factory
  .define(ClassGroup, async ({ faker }) => {
    return {
      name: `${faker.string.alpha({ length: 1, casing: 'upper' })}${faker.number.int({ min: 1, max: 6 })}`,
    }
  })
  .build()
