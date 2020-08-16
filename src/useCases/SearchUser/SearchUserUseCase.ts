import { IUsersRepository } from './../../repositories/IUsersRepository';
import { IUseCase } from './../IUseCase';
import { User } from '../../entities/User';

export class SearchUserUseCase implements IUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: string): Promise<User[]> {
    const users = await this.usersRepository.findAll(data)

    return users
  }
}