import vine from '@vinejs/vine'

const classGroupValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(255),
    teacherId: vine.number().positive().optional(),
  })
)

export { classGroupValidator }
