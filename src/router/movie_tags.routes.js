const { Router } = require('express')
const MovieTagsController = require('../controllers/MovieTagsController')

const MovieTagsRouter = Router()
const movieTagsController = new MovieTagsController()

MovieTagsRouter.get('/:user_id', movieTagsController.index)

module.exports = MovieTagsRouter
