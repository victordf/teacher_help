import path from 'path';

const databaseDir = path.resolve(__dirname, 'src', 'database')
const migrationDir = path.resolve(databaseDir, 'migrations')

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(databaseDir, 'database.sqlite')
    },
    migrations: {
      directory: migrationDir
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
