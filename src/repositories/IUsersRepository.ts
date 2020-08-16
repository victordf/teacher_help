import { User } from "../entities/User";

export interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  findAll(search: string): Promise<User[]>;
  create(user: User): Promise<void>;
  update(user:User): Promise<void>;
  delete(id: string): Promise<void>;
}