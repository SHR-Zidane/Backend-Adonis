import User from '#models/user'
import Comment from '#models/comment'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class CommentPolicy extends BasePolicy {
  async update(user: User, comment: Comment) {
    return user.role === 'admin' || comment.teacherId === user.id
  }
  async delete(user: User, comment: Comment) {
    return user.role === 'admin' || comment.teacherId === user.id
  }
  // Peut créer un commentaire (par défaut : tous les enseignants)
  async create(user: User) {
    return user.role === 'teacher' || user.role === 'admin'
  }
  // Peut voir un commentaire (par défaut : tous les enseignants)
  async view(user: User, comment: Comment) {
    return user.role === 'teacher' || user.role === 'admin'
  }
}
