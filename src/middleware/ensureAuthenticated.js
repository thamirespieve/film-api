const { verify } = require('jsonwebtoken')

const authConfig = require('../configs/auth')
const AppError = require('../utils/AppError')

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Não possível efetuar a conexão')
  }

  const [, token] = authHeader.split(' ')
  const { secret } = authConfig.jwt

  try {
    const { sub: user_id } = verify(token, secret)

    request.name = {
      id: Number(user_id)
    }

    return next()
  } catch (error) {
    throw new AppError('Não possível efetuar a conexão')
  }
}

module.exports = ensureAuthenticated
