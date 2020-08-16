import { IUsersRepository } from './../IUsersRepository';
import { User } from '../../entities/User';

export class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email) as User;

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id) as User;

    return user;
  }

  async findAll(search: string): Promise<User[]> {
    return this.users
  }

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async update(user: User): Promise<void> {
    this.users.map(userF => {
      if (userF.id === user.id) {
        return {
          ...userF,
          ...user
        }
      }
      return userF
    })
  }

  async delete(id: string): Promise<void> {
    this.users.forEach((user, index) => {
      if (user.id === id) {
        this.users[index].deletedAt = new Date()
      }
    })
  }
}