const { Router } = require('express')
const multer = require('multer')

const uploadConfig = require('../configs/upload')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const UsersController = require('../controllers/UsersController')
const UsersAvatarController = require('../controllers/UserAvatarController')

const usersRouter = Router()

const usersController = new UsersController()
const usersAvatarController = new UsersAvatarController()

const upload = multer(uploadConfig.MULTER)

usersRouter.post('/', usersController.create)
usersRouter.put('/', ensureAuthenticated, usersController.update)
usersRouter.get('/', ensureAuthenticated, usersController.show)
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update
)

module.exports = usersRouter
