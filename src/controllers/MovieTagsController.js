const knex = require('../database/knex/index')

class MovieNotesController {
  async index(request, response) {
    const { user_id } = request.params

    const movie = await knex('movie_tags').where({ user_id })

    response.json(movie)
  }
}

module.exports = MovieNotesController
