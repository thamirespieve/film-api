const knex = require('../database/knex')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

const authConfig = require('../configs/auth')
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

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    response.json({ user, token })
  }
}

module.exports = SessionsController
