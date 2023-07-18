import { Role } from '../entities/user.entity';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserInput {
  @IsNotEmpty()
  @Length(4, 50)
  name: string;

  @IsNotEmpty()
  @Length(4, 50)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  role: Role;
}
