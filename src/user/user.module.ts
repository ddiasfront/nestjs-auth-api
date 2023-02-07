import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Module({
  providers: [UserResolver, UserService, BcryptService],
})
export class UserModule {}
