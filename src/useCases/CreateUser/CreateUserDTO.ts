export interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;

  createdAt?: Date;
  updatedAt?: Date;
}