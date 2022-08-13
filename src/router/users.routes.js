const { Router } = require('express')
const UsersController = require('../controllers/UsersController')

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', usersController.index)

module.exports = usersRouter
