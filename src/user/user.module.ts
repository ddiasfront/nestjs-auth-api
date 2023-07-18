import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { EmailValidationService } from '../email/emailValidation.service';
import { ConfigService } from '@nestjs/config';
import { JWTService } from '../jwt/jwt.service';
import { UsersController } from './users.controller';

@Module({
  providers: [
    UserResolver,
    UserService,
    BcryptService,
    EmailValidationService,
    ConfigService,
    JWTService,
  ],
  controllers: [UsersController],
})
export class UserModule {}
