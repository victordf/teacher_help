import { CreateUserUseCase } from './CreateUserUseCase';
import { IController } from './../IController';
import { Request, Response } from "express";

export class CreateUserController implements IController {

  constructor(
    private createUserUseCase: CreateUserUseCase
  ) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password } = req.body;

    try {
      const user = await this.createUserUseCase.execute({
        name,
        email,
        password
      })

      return res.status(201).json(user);
    } catch(err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}