const { Router } = require('express')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const MovieNotesController = require('../controllers/MovieNotesController')

const movieNotesRouter = Router()
const movieNotesController = new MovieNotesController()

movieNotesRouter.use(ensureAuthenticated)

movieNotesRouter.post('/', movieNotesController.create)
movieNotesRouter.get('/', movieNotesController.index)
movieNotesRouter.get('/:id', movieNotesController.show)
movieNotesRouter.delete('/:id', movieNotesController.delete)

module.exports = movieNotesRouter
