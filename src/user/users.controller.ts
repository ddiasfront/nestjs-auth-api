import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('report')
  getReport(): Buffer {
    return Buffer.from('123');
  }
}
