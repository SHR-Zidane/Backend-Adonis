import type { HttpContext } from '@adonisjs/core/http'
import ClassGroup from '#models/class_group'
import { classGroupValidator } from '#validators/class_group'

export default class ClassGroupsController {
  async index({}: HttpContext) {
    return ClassGroup.query().orderBy('name')
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(classGroupValidator)
    const classGroup = await ClassGroup.create(data)

    return response.created(classGroup)
  }

  async show({ params }: HttpContext) {
    return ClassGroup.findOrFail(params.id)
  }

  async edit({}: HttpContext) {}

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(classGroupValidator)
    const classGroup = await ClassGroup.findOrFail(params.id)

    classGroup.merge(data)
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
