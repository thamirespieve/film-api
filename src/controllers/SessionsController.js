const knex = require('../database/knex')
const { compare } = require('bcryptjs')

const AppError = require('../utils/AppError')

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex('users').where({ email }).first()

    if (!user) {
      throw new AppError('Usuário não existe.')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email e/ou senha inválido')
    }

    response.json(user)
  }
}

module.exports = SessionsController
