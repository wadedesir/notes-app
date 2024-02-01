import mongoose from 'mongoose'
import supertest from 'supertest'
import Server from '../index.js'

const api = supertest(Server)

test('notes are returned as json', async () => {
  await api
    .get('/v1/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})
