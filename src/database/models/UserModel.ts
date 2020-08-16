import { IUser } from './../interfaces/IUser';
import { v4 } from 'uuid';
import { Model } from 'objection'

export class UserModel extends Model implements IUser {
  public id!: string;

  public name!: string;
  public email!: string;
  public password!: string;
  
  public createdAt?: Date
  public updatedAt?: Date
  public deletedAt?: Date

  public $beforeInsert(): void {
    if (!this.id) {
      this.id = v4()
    }
    this.createdAt = new Date()
  }

  public $beforeUpdate(): void {
    this.updatedAt = new Date()
  }

  public static get tableName(): string {
    return 'users'
  }

  public static get relationMappings(): any {
    return {}
  }
}