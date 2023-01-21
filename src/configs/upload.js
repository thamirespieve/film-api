const path = require('path')
const multer = require('multer')
const crypto = require('crypto')

const TPM_FOLDER = path.resolve(__dirname, '..', '..', 'tmp')

const UPLOAD_FOLDER = path.resolve(TPM_FOLDER, 'uploads')

const MULTER = {
  storage: multer.diskStorage({
    destination: TPM_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const filename = `${fileHash}-${file.originalname}`

      return callback(null, filename)
    }
  })
}

module.exports = { TPM_FOLDER, UPLOAD_FOLDER, MULTER }
