const { Router } = require('express')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const MovieTagsController = require('../controllers/MovieTagsController')

const MovieTagsRouter = Router()
const movieTagsController = new MovieTagsController()

MovieTagsRouter.get('/', ensureAuthenticated, movieTagsController.index)

module.exports = MovieTagsRouter
