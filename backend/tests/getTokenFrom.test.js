import { getTokenFrom } from '../controllers/NoteController'

describe('Unit tests for getTokenfunction', () => {
  const token = '123456789'

  test("when header starts with 'Bearer' token is correctly extracted", () => {
    const authHeader = `Bearer ${token}`
    const authorizedUserToken = getTokenFrom(authHeader)

    expect(authorizedUserToken).toBe(token)
  })

  test("when header does not start with 'Bearer' getTokenFrom returns null", () => {
    const authHeader = `Invalid ${token}`
    const invalidFormatToken = getTokenFrom(authHeader)
    const emptyToken = getTokenFrom('')

    expect(invalidFormatToken).toBeNull()
    expect(emptyToken).toBeNull()
  })
})
