import { User } from './../../entities/User';
import { ICreateUserRequestDTO } from './../CreateUser/CreateUserDTO';
import { CreateUserUseCase } from './../CreateUser/CreateUserUseCase';
import { DeleteUserUseCase } from './DeleteUserUseCase';
import { FakeUsersRepository } from './../../repositories/implementations/FakeUsersRepository';
import { IUseCase } from './../IUseCase';
import { IUsersRepository } from './../../repositories/IUsersRepository';

describe('DeleteUser', () => {
  let userRepository: IUsersRepository
  let useCase: IUseCase
  let createUseCase: IUseCase
  let user: User

  beforeEach(async () => {
    userRepository = new FakeUsersRepository()
    useCase = new DeleteUserUseCase(userRepository)
    createUseCase = new CreateUserUseCase(userRepository)

    let data = {
      id: 1,
      name: 'Victor Martins Machado',
      email: 'victormachado90@gmail.com',
      password: '123456'
    } as ICreateUserRequestDTO

    user = await createUseCase.execute(data)
  })

  it('should be able to delete a user', async () => {
    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(user)

    await useCase.execute({ id: user.id })

    const userDeleted = await userRepository.findById(user.id)

    expect(userDeleted.deletedAt).toBeDefined()
  })

  it('should throw error when user not found', async () => {
    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce({} as User)

    try {
      await useCase.execute({ id: user.id })
    } catch(err) {
      expect(err.message).toBe('User not found')
    }
  })
})