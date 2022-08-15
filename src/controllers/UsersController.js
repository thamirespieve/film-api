const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')
const { hash, compare } = require('bcryptjs')

class UsersController {
  //Criando um usuário
  async create(request, response) {
    const database = await sqliteConnection()
    const { name, email, password } = request.body

    const checkUserExists = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (checkUserExists) {
      throw new AppError('Email de Usuário já cadastrado')
    }

    const hashedPassword = await hash(password, 8)

    await database.run(
      'INSERT INTO users (name,email,password) VALUES (?,?,?)',
      [name, email, hashedPassword]
    )

    response.status(201).json()
  }

  // atualizando usuário
  async update(request, response) {
    const database = await sqliteConnection()
    const { name, email, password, old_password } = request.body
    const { id } = request.params

    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])

    if (!user) throw new AppError('Usuário não cadastrado')

    const userWithUpdateEmail = await database.get(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    if (userWithUpdateEmail && userWithUpdateEmail.id != user.id)
      throw new AppError('Email já cadastrado')

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (!old_password)
      throw new AppError('É necessário informar a senha antiga')

    if (!password) throw new AppError('É necessário informar a nova senha')

    if (password && old_password) {
      const checkedOldPassword = compare(old_password, user.password)

      if (!checkedOldPassword)
        throw new AppError('As senha está incorreta, tente novamente !')

      user.password = await hash(password, 8)
    }

    await database.run(
      `
      UPDATE users SET
      name = ? ,
      email = ?,
      password = ?,
      updated_at =  DATETIME('now')
      WHERE id = ?
    `,
      [user.name, user.email, user.password, id]
    )

    response.status(201).json()
  }
}

module.exports = UsersController
