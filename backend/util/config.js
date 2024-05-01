import 'dotenv/config'

/**
 * The port number for the server to listen on.
 * Defaults to 8420 if not specified in the environment variables.
 * @type {number}
 */
export const PORT_NUM = process.env.PORT || 8420

/**
 * The MongoDB URI used for database connection.
 * Uses different URIs based on the environment (test or production).
 * @type {string}
 */
export const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

/**
 * The name of the MongoDB database.
 * Uses different database names based on the environment (test or production).
 * @type {string}
 */
export const DB_NAME = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DB_NAME
  : process.env.DB_NAME

/**
 * The secret key used for generating JSON Web Tokens (JWT).
 * @type {string}
 */
export const SECRET = process.env.SECRET

/**
 * OpenAI API Key, ProjectID, and Organization ID
 * @type {string}
 */
export const AI_KEY = "sk-proj-JusCbKpt7S69RCJ8Qo4sT3BlbkFJCD6yhmFAoAvPGvC8kS0E"
export const PROJ_ID = "proj_Vyk8OIIDLwqw9c3vgehulUOU"
export const ORG_ID = "org-fn09iT3XneT2Bw0hUku03lEU"