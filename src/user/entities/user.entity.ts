import { Replace } from 'src/helpers/Replace';
import { randomUUID } from 'crypto';

export interface UserProps {
  createdAt: Date;
  email: string;
  name: string;
  role?: Role;
  readAt?: Date | null;
  password: string;
}

export enum Role {
  user = 'user',
  admin = 'admin',
}

export class UserEntity {
  private props: UserProps;
  private _id: string;
  constructor(props: Replace<UserProps, { createdAt?: Date }>) {
    this._id = randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      role: props.role || Role.user,
    };
  }

  public get id() {
    return this._id;
  }
  public set name(name: string) {
    this.props.name = name;
  }
  public get name() {
    return this.props.name;
  }
  public set password(password: string) {
    this.props.password = password;
  }
  public get password() {
    return this.props.password;
  }
  public set email(email: string) {
    this.props.email = email;
  }
  public get email() {
    return this.props.email;
  }
  public set readAt(readAt: Date) {
    this.props.readAt = readAt;
  }
  public get readAt(): Date {
    return this.props.readAt;
  }
  public set role(role: Role) {
    this.props.role = role;
  }
  public get role() {
    return this.props.role;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
