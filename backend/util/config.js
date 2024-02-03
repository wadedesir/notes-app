import 'dotenv/config'

export const PORT_NUM = process.env.PORT || 8420

export const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

export const DB_NAME = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DB_NAME
  : process.env.DB_NAME

export const SECRET = process.env.SECRET
