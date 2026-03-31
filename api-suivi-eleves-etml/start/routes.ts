/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'

const StudentsController = () => import('#controllers/students_controller')
const TeachersController = () => import('#controllers/teachers_controller')
const ClassGroupsController = () => import('#controllers/class_groups_controller')

router.get('test', async () => {
  return 'API is working ! '
})

router.resource('students', StudentsController).apiOnly()
router.resource('teachers', TeachersController).apiOnly()
router.resource('classGroups', ClassGroupsController).apiOnly()
