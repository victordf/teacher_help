import { IDeleteUserRequestDTO } from './DeleteUserDTO';
import { IUsersRepository } from './../../repositories/IUsersRepository';
import { IUseCase } from './../IUseCase';

export class DeleteUserUseCase implements IUseCase {
  constructor(
    private userRepository: IUsersRepository
  ) {}

  async execute(data: IDeleteUserRequestDTO): Promise<void> {
    const userData = await this.userRepository.findById(data.id)

    if (!userData.id) {
      throw new Error('User not found')
    }

    await this.userRepository.delete(data.id)
  }
}