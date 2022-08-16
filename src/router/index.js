const { Router } = require('express')

const router = Router()
const usersRouter = require('./users.routes')
const movieNotesRouter = require('./movie_notes.routes')

router.use('/user', usersRouter)
router.use('/movieNotes', movieNotesRouter)

module.exports = router
