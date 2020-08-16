import { IUseCase } from './../IUseCase';
import { IUsersRepository } from './../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { User } from '../../entities/User';

export class CreateUserUseCase implements IUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = new User(data);

    await this.usersRepository.create(user);

    return user
  }
}