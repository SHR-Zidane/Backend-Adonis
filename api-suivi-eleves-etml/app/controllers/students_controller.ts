import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import { studentValidator } from '#validators/student'

export default class StudentsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return Student.query().orderBy('name').orderBy('firstname')
  }

  /**
   * Display form to create a new record
   */
  async store({ request, response }: HttpContext) {
    const { name, firstname } = await request.validateUsing(studentValidator)

    const student = await Student.create({ name, firstname })

    return response.created(student)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return Student.findOrFail(params.id)
  }

  /**
   * Edit individual record
   */
  async edit({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const data = request.only(['name', 'firstname'])

    const student = await Student.findOrFail(params.id)

    student.merge(data)

    await student.save()

    response.ok(`l'utilisateur ${student.firstname} ${student.name} a bien été modifié`)

    return student
  }
  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const student = await Student.findOrFail(params.id)
    student.delete()
    return response.ok(`l'utilisateur : ${student.firstname} ${student.name} a bien été supprimé`)
  }
}
