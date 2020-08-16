import { v4 } from 'uuid'

export class User {
  public readonly id!: string;

  public name!: string;
  public email!: string;
  public password!: string;

  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;

  constructor(props: Omit<Omit<User, 'id'>, 'change'>, id?: string) {
    Object.assign(this, props)

    if (!id) { this.id = v4() } else { this.updatedAt = new Date() }
    if (!props.createdAt) { this.createdAt = new Date() }
  }

  change(field: string, value: string): void {
    Object.assign(this, { [field]: value })
  }
}