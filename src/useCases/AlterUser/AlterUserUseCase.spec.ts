import { CreateUserUseCase } from './../CreateUser/CreateUserUseCase';
import { User } from './../../entities/User';
import { ICreateUserRequestDTO } from './../CreateUser/CreateUserDTO';
import { AlterUserUseCase } from './AlterUserUseCase';
import { FakeUsersRepository } from './../../repositories/implementations/FakeUsersRepository';
import { IUseCase } from './../IUseCase';
import { IUsersRepository } from './../../repositories/IUsersRepository';

describe('AlterUser', () => {
  let userRepository: IUsersRepository
  let useCase: IUseCase
  let createUseCase: IUseCase
  let user: User

  beforeEach(async () => {
    userRepository = new FakeUsersRepository()
    useCase = new AlterUserUseCase(userRepository)
    createUseCase = new CreateUserUseCase(userRepository)

    let data = {
      id: 1,
      name: 'Victor Martins Machado',
      email: 'victormachado90@gmail.com',
      password: '123456'
    } as ICreateUserRequestDTO

    user = await createUseCase.execute(data)
  })

  it('should be able to alter a user', async () => {
    const userAltered = await useCase.execute({
      ...user,
      password: 'testesenha'
    })

    expect(userAltered).toBeInstanceOf(User)
  })

  it('should throw error when user not found', async () => {
    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce({} as User)

    try {
      await useCase.execute({
        ...user,
        password: 'testesenha'
      })
    } catch(err) {
      expect(err.message).toBe('User not found')
    }
  })

})