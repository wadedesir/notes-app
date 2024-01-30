import express from 'express';
import Note from '../models/note.js';

const NotesRouter = express.Router()

NotesRouter.get('/', async (req, res) => {
  const notes = Note.find({})
  res.json(notes)
})


/**
 * Route for handling note requests by ID
 * @name server/getNote
 * @method
 * @memberof module:routers
 * @inner
 * @param {string} req.params.id - ID of the note to retrieve
 */
NotesRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params["id"];
    const note = await Note.findById(id);
    if (!note) {
      res.status(404);
      res.json({ message: `404 note with id:${id} not found` });
    } else {
      res.json(note);
    }
  } catch (e) {
    next(e);
  }
})

/**
 * Route for creating new notes
 * @name server/createNote
 * @method
 * @memberof module:routers
 * @inner
 * @param {object} req.body - Body of the note
 */
NotesRouter.post('/', async (req, res, next) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  try {
    const savedNote = await note.save()
    res.json(savedNote)
  } catch (error) {
    next(error)
  }
})

/**
 * Route for deleting notes by ID
 * @name server/deleteNote
 * @method
 * @memberof module:routers
 * @inner
 * @param {string} req.params.id - ID of the note to delete
 */
NotesRouter.delete('/:id', async (req, res, next) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id)
    res.json(deletedNote)
  } catch (error) {
    next(error)
    
  }
})

/**
 * Route for updating notes by ID
 * @name server/updateNote
 * @method
 * @memberof module:routers
 * @inner
 * @param {string} req.params.id - ID of the note to delete
 * @param {object} req.body - body of the updated note
 */
NotesRouter.put('/:id', async (req, res, next) => {
  const body = req.body

  const noteEdit = {
    content: body.content,
    important: body.important,
  }

  try {
    const updatedNote = Note.findByIdAndUpdate(req.params.id, noteEdit, { new: true })
    res.json(updatedNote)
  } catch (error) {
    next(error)
  }
})

/**
 * Route for searching notes by keywords
 * @name server/search
 * @method
 * @memberof module:routers
 * @inner
 * @param {string} req.query.keywords - Keywords to search for
 */
// NotesRouter.get("/search", async (req, res, next) => {
//   try {
//     const keywords = req.query.keywords;
//     const notes = await Note.getByKeywords(keywords);
//     if (!notes) {
//       res.status(404);
//       res.json({ message: `404 note with keywords:${keywords} not found` });
//     } else {
//       res.json(notes);
//     }
//   } catch (e) {
//     next(e);
//   }
// });

export default NotesRouter
