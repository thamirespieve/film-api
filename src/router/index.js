const { Router } = require('express')

const router = Router()
const usersRouter = require('./users.routes')
const sessionsRouter = require('./sessions.routes')
const movieNotesRouter = require('./movie_notes.routes')
const movieTagsRouter = require('./movie_tags.routes')

router.use('/user', usersRouter)
router.use('/sessions', sessionsRouter)
router.use('/movieNotes', movieNotesRouter)
router.use('/movieTags', movieTagsRouter)

module.exports = router
