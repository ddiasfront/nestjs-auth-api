import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { EmailValidationService } from '../emailValidation/emailValidation.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    UserResolver,
    UserService,
    BcryptService,
    EmailValidationService,
    ConfigService,
  ],
})
export class UserModule {}
