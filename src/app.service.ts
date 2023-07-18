import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHey(): string {
    return 'Hello World!';
  }
}
