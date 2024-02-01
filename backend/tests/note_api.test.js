import mongoose from 'mongoose'
import supertest from 'supertest'
import Server from '../index.js'
import Note from '../models/Note.js'
import User from '../models/User.js'

const testServer = supertest(Server)

let token = ''

beforeAll(async () => {
  await Note.deleteMany({})
  await User.deleteMany({})
})

test('users are returned as json', async () => {
  await testServer
    .get('/v1/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('a valid user can be added', async () => {
  const newUser = {
    name: 'Seymour',
    password: 'Cox',
    username: 'seymourcox420',
  }

  await testServer
    .post('/v1/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await testServer.get('/v1/users')
  const contents = res.body.map(r => r.username)

  expect(contents).toContain(
    'seymourcox420'
  )
})

test('logging in is possible', async () => {
  const loginInfo = {
    password: 'Cox',
    username: 'seymourcox420',
  }

  const res = await testServer
    .post('/v1/login')
    .send(loginInfo)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  token = res.body.token
})

test('notes are returned as json', async () => {
  await testServer
    .get('/v1/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('valid notes can be added', async () => {
  const initNotes = [
    {
      content: 'HTML is easy',
      important: false,
    },
    {
      content: 'Browser can execute only JavaScript',
      important: true,
    },
  ]

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


afterAll(async () => {
  await mongoose.connection.close()
})
