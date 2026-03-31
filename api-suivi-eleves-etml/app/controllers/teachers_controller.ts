import type { HttpContext } from '@adonisjs/core/http'
import Teacher from '#models/teacher'
import { teacherValidator } from '#validators/teacher'

export default class TeachersController {
  async index({}: HttpContext) {
    return Teacher.query().orderBy('name').orderBy('firstname')
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(teacherValidator)
    const teacher = await Teacher.create(data)

    return response.created(teacher)
  }

  async show({ params }: HttpContext) {
    return Teacher.findOrFail(params.id)
  }

  async edit({}: HttpContext) {}

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(teacherValidator)
    const teacher = await Teacher.findOrFail(params.id)

    teacher.merge(data)
    await teacher.save()

    response.ok(`l'enseignant ${teacher.firstname} ${teacher.name} a bien ete modifie`)

    return teacher
  }

  async destroy({ params, response }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)
    await teacher.delete()

    return response.ok(`l'enseignant ${teacher.firstname} ${teacher.name} a bien ete supprime`)
  }
}
