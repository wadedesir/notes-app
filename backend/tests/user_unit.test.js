describe('Unit Tests for User APIs', () => {
  describe('Unit Tests for findUserById', () => {
    beforeAll(async () => {
      jest.unstable_mockModule('../models/User', () => ({
        default: {
          findById: jest.fn().mockImplementation(id => {
            if (id === '123456789') {
              return Promise.resolve({
                _id: '123456789'
              })
            } else {
              return Promise.resolve(null)
            }
          })
        }
      }))

      findUserById = (await import('../controllers/UserController')).findUserById
    })
    test('when valid ID return user ', async () => {
      const mockUser = { _id: '123456789' }
      const req = {
        params: { id: '123456789' }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      await findUserById(req, res)

      expect(res.json).toHaveBeenCalledWith(mockUser)
    })

    test('when user id is not found, return 404', async () => {
      const req = {
        params: { id: 'ID NOT Found IN DB' }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      await findUserById(req, res)

      expect(res.json).toHaveBeenCalledWith({
        error: 'user with id:ID NOT Found IN DB not found'
      })
      expect(res.status).toHaveBeenCalledWith(404)
    })
  })
})
