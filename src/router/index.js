const { Router } = require('express')

const router = Router()
const usersRouter = require('./users.routes')

router.use('/user', usersRouter)

module.exports = router
