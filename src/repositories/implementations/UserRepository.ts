import { IUsersRepository } from './../IUsersRepository';
import db from '../../database/connections'
import { User } from '../../entities/User';

export class UserRepository implements IUsersRepository {

  findByEmail = async (email: string): Promise<User> => {
    const users = await db('users')
      .select('*')
      .where('email', '=', email) as User[]

    return users[0]
  }

  findById = async (id: string): Promise<User> => {
    const users = await db('users')
      .select('*')
      .where('id', '=', id) as User[]

    return users[0]
  }

  findAll = async (search: string): Promise<User[]> => {
    const queryBuild = () => db('users')

    if (search) {
      queryBuild()
        .where('name', 'like', `%${search}%`)
        .orWhere('email', 'like', `%${search}%`)
    }

    queryBuild()
      .whereNotNull('deletedAt')

    const users = await queryBuild().select('*') as User[]

    return users
  }

  create = async (user: User): Promise<void> => {
    const trx = await db.transaction()

    try {
      await trx('users').insert(user)
      await trx.commit()
    } catch(err) {
      await trx.rollback()
      throw new Error(err.message || 'Unexpected error')
    }
  }

  update = async (user: User): Promise<void> => {
    const trx = await db.transaction()

    try {
      await trx('users')
        .where('id', '=', user.id)
        .update(user)
      await trx.commit()
    } catch(err) {
      await trx.rollback()
      throw new Error(err.message || 'Unexpected error')
    }
  }

  delete = async (id: string): Promise<void> => {
    const trx = await db.transaction()

    try {
      const deletedAt = new Date()

      await trx('users')
        .where('id', '=', id)
        .update({ deletedAt })

      await trx.commit()
    } catch(err) {
      await trx.rollback()
      throw new Error(err.message || 'Unexpected error')
    }
  }
}