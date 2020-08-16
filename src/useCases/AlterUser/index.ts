import { UserRepository } from './../../repositories/implementations/UserRepository';
import { AlterUserController } from './AlterUserController';
import { AlterUserUseCase } from './AlterUserUseCase';

const userRepository = new UserRepository()

const alterUserUseCase = new AlterUserUseCase(
  userRepository
)

const alterUserController = new AlterUserController(
  alterUserUseCase
)

export { alterUserController, alterUserUseCase }