const { fetchAllNotesController, updateNotesController, deleteNotesController, createNotesController } = require("../Controllers/notesController")

const notesRouter = require("express").Router()

notesRouter.get('/', fetchAllNotesController)
notesRouter.post('/create-notes', createNotesController)
notesRouter.put('/:id', updateNotesController)
notesRouter.delete('/:id', deleteNotesController)

module.exports = notesRouter