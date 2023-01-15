const knex = require('../database/knex')
const DiskStorage = require('../providers/DiskStorage')

const AppError = require('../utils/AppError')

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id
    const avatarFilename = request.file.filename

    const diskStage = new DiskStorage()

    const user = await knex('users').where({ id: user_id }).first()

    if (!user) {
      throw new AppError(
        'Somente usuários cadastrados podem mudar o avatar.',
        401
      )
    }

    if (user.avatar) {
      await diskStage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)

    user.avatar = filename

    await knex('users').upload(user).where({ id: user_id })

    return response.json(user)
  }
}

module.exports = UserAvatarController