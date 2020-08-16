import { FakeUsersRepository } from './../../repositories/implementations/FakeUsersRepository';
import { User } from './../../entities/User';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';
import { IUseCase } from './../IUseCase';
import { IUsersRepository } from './../../repositories/IUsersRepository';

describe('CreateUser', () => {
  let userRepository: IUsersRepository
  let useCase: IUseCase

  beforeEach(async () => {
    userRepository = new FakeUsersRepository()
    useCase = new CreateUserUseCase(userRepository)
  })

  it('should be able to create a new user', async () => {
    let data = {
      name: 'Victor Martins Machado',
      email: 'victormachado90@gmail.com',
      password: '123456'
    } as ICreateUserRequestDTO

    const user = await useCase.execute(data)

    expect(user).toBeInstanceOf(User)
  })

  it('should throw error when user already exists', async () => {
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce({
      name: 'Victor Martins Machado',
      email: 'victormachado90@gmail.com'
    } as User)

    let data = {
      name: 'Victor Martins Machado',
      email: 'victormachado90@gmail.com',
      password: '123456'
    } as ICreateUserRequestDTO

    try {
      await useCase.execute(data)
      fail()
    } catch (err) {
      expect(err.message).toBe('User already exists')
    }
  })
})