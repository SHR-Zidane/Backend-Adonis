import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import { studentValidator } from '#validators/student'
import { getStudentsQueryValidator } from '#validators/get_students_query'

export default class StudentsController {
  /**
   * Display a list of resource
   */
  async index({ response, request }: HttpContext) {
    // Récupère les paramètres de pagination de la requête
    const {
      page = 1,
      limit = 10,
      sort = 'name',
      order = 'asc',
      classGroupId,
      search,
    } = await request.validateUsing(getStudentsQueryValidator)

    const query = Student.query().preload('classGroup').preload('comments')
    if (classGroupId) {
      query.where('class_group_id', classGroupId)
    }
    // Recherche sur le nom et le prénom des étudiants
    if (search) {
      query.where((subQuery) => {
        subQuery.whereILike('name', `%${search}%`).orWhereILike('firstname', `%${search}%`)
      })
    }
    // Tri des étudiants par le champ spécifié (sort) et l'ordre (asc ou desc)
    query.orderBy(sort, order as 'asc' | 'desc')
    // A noter que le await est nécessaire pour exécuter la requête
    // et volontairement omis précédemment pour éviter l'exécution prématurée
    const students = await query.paginate(page, limit) // Pagination des résultats
    // affiche correctement le chemin (/students),
    students.baseUrl('/students')
    // conserve les paramètres (recherche, tri, etc.).
    students.queryString({ page, limit, sort, order, classGroupId, search })
    return response.ok(students)
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
