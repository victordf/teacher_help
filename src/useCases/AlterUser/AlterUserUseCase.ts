import { IAlterUserRequestDTO } from './AlterUserDTO';
import { IUsersRepository } from './../../repositories/IUsersRepository';
import { IUseCase } from './../IUseCase';
import { User } from '../../entities/User';

export class AlterUserUseCase implements IUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: IAlterUserRequestDTO): Promise<User> {
    const userData = await this.usersRepository.findById(data.id);

    if (!userData.id) {
      throw new Error('User not found')
    }

    const user = new User(userData, data.id)

    Object.entries(data).forEach(([id, value]) => {
      if (id !== 'id' && value) {
        user.change(id, value)
      }
    })

    await this.usersRepository.update(user)
    
    return user;
  }
}