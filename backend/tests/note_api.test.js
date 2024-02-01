import mongoose from 'mongoose'
import supertest from 'supertest'
import Server from '../index.js'

const api = supertest(Server)

test('notes are returned as json', async () => {
  await api
    .get('/v1/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two notes', async () => {
  const response = await api.get('/v1/notes')

  expect(response.body).toHaveLength(2)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/v1/notes')

  expect(response.body[0].content).toBe('HTML is easy')
})

afterAll(async () => {
  await mongoose.connection.close()
})
