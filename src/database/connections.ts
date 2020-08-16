import knex from 'knex'

import { NODE_ENV } from '../settings'

const config = require('../../knexfile')

const db = knex(config[NODE_ENV])

export default db