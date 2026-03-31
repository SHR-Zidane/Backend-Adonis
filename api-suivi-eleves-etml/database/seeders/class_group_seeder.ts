import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { ClassGroupFactory } from '#database/factories/class_group_factory'
import Teacher from '#models/teacher'

export default class extends BaseSeeder {
  async run() {
    const teachers = await Teacher.query().select('id')
    const teacherIds = teachers.map((teacher) => teacher.id)

    const classGroups = await ClassGroupFactory.createMany(6)

    if (!teacherIds.length) {
      return
    }

    for (const classGroup of classGroups) {
      const randomTeacherId = teacherIds[Math.floor(Math.random() * teacherIds.length)]
      classGroup.merge({ teacherId: randomTeacherId })
      await classGroup.save()
    }
  }
}
