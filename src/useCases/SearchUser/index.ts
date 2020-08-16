import { SearchUserController } from './SearchUserController';
import { SearchUserUseCase } from './SearchUserUseCase';
import { UserRepository } from './../../repositories/implementations/UserRepository';

const userRepository = new UserRepository()

const searchUserUseCase = new SearchUserUseCase(
  userRepository
)

const searchUserController = new SearchUserController(
  searchUserUseCase
)

export { searchUserController, searchUserUseCase }