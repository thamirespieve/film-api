const { Router } = require('express')
const MovieNotesController = require('../controllers/MovieNotesController')

const movieNotesRouter = Router()
const movieNotesController = new MovieNotesController()

movieNotesRouter.post('/:user_id', movieNotesController.create)
movieNotesRouter.get('/:id', movieNotesController.index)
movieNotesRouter.delete('/:id', movieNotesController.delete)

module.exports = movieNotesRouter
