import { Role } from '../entities/user.entity';

export class CreateUserInput {
  name: string;
  password: string;
  email: string;
  role: Role;
}
