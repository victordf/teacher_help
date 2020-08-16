import dotenv from 'dotenv'

const ENV_FILE = dotenv.config().parsed || {}

export const NODE_ENV = (process.env.NODE_ENV || 'production').trim()