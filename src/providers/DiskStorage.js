const fs = require('fs')
const path = require('path')
const uploadConfig = require('../configs/upload')

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TPM_FOLDER, file),
      path.resolve(uploadConfig.UPLOAD_FOLDER, file)
    )

    return file
  }

  async deleteFile(file) {
    const filepath = path.resolve(uploadConfig.UPLOAD_FOLDER, file)

    try {
      await fs.promises.stat(filepath)
    } catch (error) {
      return error
    }

    await fs.promises.unlink(filepath)
  }
}

module.exports = DiskStorage
