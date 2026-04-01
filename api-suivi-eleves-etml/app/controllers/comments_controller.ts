import Comment from '#models/comment'
import Student from '#models/student'
import { commentValidator } from '#validators/comment'
import type { HttpContext } from '@adonisjs/core/http'
import CommentPolicy from '#policies/comment_policy'

export default class CommentsController {
  /**
   * Display a list of resource
   */
  async index({ params, response }: HttpContext) {
    const student = await Student.findOrFail(params.student_id)

    await student.load('comments', (query) => {
      query.preload('teacher')
    })
    return response.ok(student.comments)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ params, request, response, auth }: HttpContext) {
    const { content } = await request.validateUsing(commentValidator)
    // Récupération de l'utilisateur authentifié
    const user = auth.user!
    // Chargement de l'enseignant lié à cet utilisateur
    const teacher = await user.related('teacher').query().first()
    if (!teacher) {
      return response.badRequest({ message: 'Teacher not found' })
    }
    const teacherId = teacher.id
    // Création du commentaire lié à l'élève
    const comment = await Comment.create({
      content,
      studentId: params.student_id,
      teacherId,
    })
    // Réponse HTTP 201 avec le commentaire
    return response.created(comment)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const comment = await Comment.query()
      .where('id', params.id)
      .where('student_id', params.student_id)
      .preload('teacher')
      .firstOrFail()

    return response.ok(comment)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, bouncer }: HttpContext) {
    const { content } = await request.validateUsing(commentValidator)
    // Vérifie que le commentaire appartient bien à l'élève
    const comment = await Comment.query()
      .where('id', params.id)
      .where('student_id', params.student_id)
      .firstOrFail()

    if (await bouncer.with(CommentPolicy).denies('update', comment)) {
      return response.unauthorized({
        message:
          "Vous n'êtes pas l'auteur de ce commentaire. Vous n'avez pas le droit de le modifier",
      })
    }
    // Mise à jour
    comment.content = content
    await comment.save()
    // Réponse 200 OK avec le commentaire mis à jour
    return response.ok(comment)
  }

  /**
   * Delete record
   */
  async destroy({ params, response, bouncer }: HttpContext) {
    const comment = await Comment.query()
      .where('id', params.id)
      .where('student_id', params.student_id)
      .firstOrFail()
    if (await bouncer.with(CommentPolicy).denies('delete', comment)) {
      return response.unauthorized({
        message:
          "Vous n'êtes pas l'auteur de ce commentaire. Vous n'avez pas le droit de le supprimer",
      })
    }
    // Suppression du commentaire
    await comment.delete()
    // On utilise `response.noContent` pour retourner un code HTTP 204 sans contenu
    return response.noContent()
  }
}
