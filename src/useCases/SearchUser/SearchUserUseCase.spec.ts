import { ICreateUserRequestDTO } from './../CreateUser/CreateUserDTO';
import { CreateUserUseCase } from './../CreateUser/CreateUserUseCase';
import { FakeUsersRepository } from './../../repositories/implementations/FakeUsersRepository';
import { SearchUserUseCase } from './SearchUserUseCase';
import { IUseCase } from './../IUseCase';
import { IUsersRepository } from './../../repositories/IUsersRepository';

describe('SearchUser', () => {
  let userRepository: IUsersRepository
  let useCase: IUseCase
  let createUserUseCase: IUseCase

  beforeEach(async () => {
    userRepository = new FakeUsersRepository()
    useCase = new SearchUserUseCase(userRepository)
    createUserUseCase = new CreateUserUseCase(userRepository)

    let data = {
      name: 'Victor Martins Machado',
      email: 'victormachado90@gmail.com',
      password: '123456'
    } as ICreateUserRequestDTO

    await createUserUseCase.execute(data)
  })

  it('should be able to list all users', async () => {
    const users = await useCase.execute('')

    expect(users.length).toBeGreaterThan(0)
  })
})