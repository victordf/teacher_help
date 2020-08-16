import { Request, Response } from 'express';
import { SearchUserUseCase } from './SearchUserUseCase';
import { IController } from './../IController';

export class SearchUserController implements IController {
  constructor(
    private useCase: SearchUserUseCase
  ) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const { search } = req.query

    try {
      const users = await this.useCase.execute(search as string);

      return res.status(200).json(users)
    } catch(err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}