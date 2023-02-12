import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export interface IJWTService {
  sign(name: string, email: string): Promise<string>;
}

@Injectable()
export class JWTService implements IJWTService {
  constructor(private configService: ConfigService) {}

  async sign(name: string, email: string): Promise<string> {
    const secret = this.configService.get<string>('jwtSecret');
    const claims = { sub: name, email };
    const jwtToken = await jwt.sign(claims, secret, { expiresIn: '1h' });
    return jwtToken;
  }
}
