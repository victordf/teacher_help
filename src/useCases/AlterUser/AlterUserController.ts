import { Response, Request } from 'express';
import { AlterUserUseCase } from './AlterUserUseCase';
import { IController } from './../IController';

export class AlterUserController implements IController {
  constructor(
    private alterUserUseCase: AlterUserUseCase
  ) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const { name, email, password } = req.body;

    try {
      const user = await this.alterUserUseCase.execute({
        id,
        name,
        email,
        password
      })

      return res.status(201).json(user)
    } catch(err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}