const knex = require('../database/knex/index')
const AppError = require('../utils/AppError')

class MovieNotesController {
  //Adicionar um dado ao banco
  async create(request, response) {
    const user_id = request.user.id
    const { title, description, rating, tags } = request.body

    if (rating > 5 || rating < 1) {
      throw new AppError('É necessário informar uma nota entre 1 e 5')
    }

    const note_id = await knex('movie_notes').insert({
      title,
      description,
      rating,
      user_id
    })

    const tagsInsert = tags.map(tag => {
      return {
        note_id,
        name: tag,
        user_id
      }
    })

    await knex('movie_tags').insert(tagsInsert)

    return response.status(201).json({
      title,
      description,
      rating,
      user_id
    })
  }

  // Exibir um dado especifico
  async show(request, response) {
    const { id } = request.params

    const movie = await knex('movie_notes').where({ id }).first()

    response.status(201).json({ movie })
  }

  // Eibindo vários dados

  async index(request, response) {
    const { user_id } = request.query

    const movies = await knex('movie_notes').where({ user_id }).orderBy('title')

    response.json({ movies })
  }

  //Excluindo um dado
  async delete(request, response) {
    const { id } = request.params

    await knex('movie_notes').where({ id }).delete()

    response.json('Dado excluido')
  }
}

module.exports = MovieNotesController
