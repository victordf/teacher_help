import { Request, Response } from 'express';
import { DeleteUserUseCase } from './DeleteUserUseCase';
import { IController } from './../IController';

export class DeleteUserController implements IController {
  constructor(
    private deleteUserUseCase: DeleteUserUseCase
  ) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    try {
      await this.deleteUserUseCase.execute({ id })

      return res.status(200).json({
        message: 'Usuário deletado com sucesso'
      })
    } catch(err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}