const { Router } = require('express')
const SessionsController = require('../controllers/SessionsController')

const sessionsRouter = Router()
const sesionsController = new SessionsController()

sessionsRouter.post('/', sesionsController.create)

module.exports = sessionsRouter
