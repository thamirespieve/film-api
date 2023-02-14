const Router = require('express')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const MovieNotesController = require('../controllers/MovieNotesController')

const movieNotesRouter = Router()
const movieNotesController = new MovieNotesController()

movieNotesRouter.use(ensureAuthenticated)

movieNotesRouter.post('/', movieNotesController.create)
movieNotesRouter.get('/:title', movieNotesController.show)
movieNotesRouter.delete('/:id', movieNotesController.delete)
movieNotesRouter.get('/', movieNotesController.index)

module.exports = movieNotesRouter
