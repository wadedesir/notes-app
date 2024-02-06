import mongoose from 'mongoose'
import supertest from 'supertest'
import Server from '../index.js'
import Note from '../models/Note.js'
import User from '../models/User.js'
import { notesInDb, nonExistingId, initNotes } from './helper.js'

const testServer = supertest(Server)

let token = ''
let userId = ''

const testName = 'Test Dummy'
const testUserName = 'test_dummy325'
const testUserPass = 'testing123'

beforeAll(async () => {
  await Note.deleteMany({})
  await User.deleteMany({})
})

// add a new test user. this is starting with a fresh DB
describe('when there are no initial users', () => {
  test('a valid user can be added', async () => {
    const newUser = {
      name: testName,
      password: testUserPass,
      username: testUserName
    }

    await testServer
      .post('/v1/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
})

// check that the user we added comes back when we get all users
describe('when there are some initial users', () => {
  test('users are returned as json', async () => {
    const res = await testServer
      .get('/v1/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const contents = res.body.map(r => r.username)
    expect(contents).toContain(testUserName)
  }, 100000)
})

// lets try logging in with bad info. we should get back a 401 response
describe('when logged out', () => {
  test('logging in with bad info is not possible', async () => {
    const loginInfo = {
      password: 'the_wrong_password',
      username: testUserName
    }

    await testServer
      .post('/v1/login')
      .send(loginInfo)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  // lets try logging in with good info. we should get back a 200 and a token + ID
  test('logging in with correct info is possible', async () => {
    const loginInfo = {
      password: testUserPass,
      username: testUserName
    }

    const res = await testServer
      .post('/v1/login')
      .send(loginInfo)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    token = res.body.token
    userId = res.body.id
  })
})

// check that a user can be updated
describe('when logged in', () => {
  test('a valid user can be updated', async () => {
    const newUserData = {
      name: 'Test Dumay',
      password: 'testing123'
    }

    await testServer
      .put(`/v1/users/${userId}`)
      .send(newUserData)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('notes are returned as json', async () => {
    await testServer
      .get('/v1/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('valid notes can be added', async () => {
    await testServer
      .post('/v1/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(initNotes[0])
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await testServer
      .post('/v1/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(initNotes[1])
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two notes', async () => {
    const res = await testServer.get('/v1/notes')
    expect(res.body).toHaveLength(2)
  })

  test('the first note is about HTTP methods', async () => {
    const res = await testServer.get('/v1/notes')

    expect(res.body[0].content).toBe('HTML is easy')
  })

  test('a specific note is within the returned notes', async () => {
    const res = await testServer.get('/v1/notes')

    const contents = res.body.map(r => r.content)
    expect(contents).toContain(
      'Browser can execute only JavaScript'
    )
  })
})

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await testServer
      .get(`/v1/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultNote.body).toEqual(noteToView)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await nonExistingId()

    await testServer
      .get(`/v1/notes/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is malformatted', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await testServer
      .get(`/v1/notes/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true
    }

    await testServer
      .post('/v1/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await notesInDb()
    expect(notesAtEnd).toHaveLength(initNotes.length + 1)

    const contents = notesAtEnd.map(n => n.content)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('fails with status code 400 if data invalid', async () => {
    const newNote = {
      important: true
    }

    await testServer
      .post('/v1/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(newNote)
      .expect(400)

    const notesAtEnd = await notesInDb()

    expect(notesAtEnd).toHaveLength(initNotes.length + 1)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await notesInDb()
    const noteToDelete = notesAtStart[0]

    await testServer
      .delete(`/v1/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await notesInDb()

    expect(notesAtEnd).toHaveLength(
      initNotes.length
    )

    const contents = notesAtEnd.map(r => r.content)

    expect(contents).not.toContain(noteToDelete.content)
  })
})

test('a valid user can be deleted', async () => {
  await testServer
    .delete(`/v1/users/${userId}`)
    .expect(204)
})

afterAll(async () => {
  await mongoose.connection.close()
})
