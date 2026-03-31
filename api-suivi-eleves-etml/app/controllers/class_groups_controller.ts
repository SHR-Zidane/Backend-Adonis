import type { HttpContext } from '@adonisjs/core/http'
import ClassGroup from '#models/class_group'
import { classGroupValidator } from '#validators/class_group'

export default class ClassGroupsController {
  async index({}: HttpContext) {
    const classGroups = await ClassGroup.query()
      .preload('teacher')
      .orderBy('name', 'asc')

    return classGroups
  }

  async store({ request, response }: HttpContext) {
    const { name, teacherId } = await request.validateUsing(classGroupValidator)
    const classGroup = await ClassGroup.create({ name, teacherId })

    return response.created(classGroup)
  }

  async show({ params }: HttpContext) {
    const classGroup = await ClassGroup.query()
      .preload('teacher')
      .where('id', params.id)
      .firstOrFail()

    return classGroup
  }

  async edit({}: HttpContext) {}

  async update({ params, request, response }: HttpContext) {
    const { name, teacherId } = await request.validateUsing(classGroupValidator)
    const classGroup = await ClassGroup.findOrFail(params.id)

    classGroup.merge({
      name,
      ...(teacherId !== undefined ? { teacherId } : {}),
    })
    await classGroup.save()

    response.ok(`la classe ${classGroup.name} a bien ete modifiee`)

    return classGroup
  }

  async destroy({ params, response }: HttpContext) {
    const classGroup = await ClassGroup.findOrFail(params.id)
    await classGroup.delete()

    return response.ok(`la classe ${classGroup.name} a bien ete supprimee`)
  }
}
