const { Router } = require('express')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const UsersController = require('../controllers/UsersController')

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.post('/', usersController.create)
usersRouter.put('/', ensureAuthenticated, usersController.update)
usersRouter.get('/', ensureAuthenticated, usersController.show)

module.exports = usersRouter
