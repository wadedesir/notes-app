import { createNewNote } from '../controllers/NoteController'
import jwt from 'jsonwebtoken'

describe('Unit Tests for Note APIs', () => {
  describe('Unit Tests for createNewNote', () => {
    const reqBody = { content: 'Test Note', important: false }

    test('when authorization header is empty, return error', async () => {
      const req = {
        body: reqBody,
        get: jest.fn().mockReturnValue('')
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      await createNewNote(req, res)

      expect(req.get).toHaveBeenCalledWith('authorization')
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ error: 'must provide auth token' })
    })

    test('when decoded token has no id, return error', async () => {
      const req = {
        body: reqBody,
        get: jest.fn().mockReturnValue('Bearer ValidHeader123456789')
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      jest.spyOn(jwt, 'verify').mockReturnValue({ id: undefined })

      await createNewNote(req, res)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({ error: 'token invalid' })
    })
  })
})
