import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EmaiValidationOutput } from 'src/user/dto/email-validation-output';
import axios, { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

export interface IEmailValidationService {
  validate(email: string): Promise<AxiosResponse<EmaiValidationOutput>>;
}

@Injectable()
export class EmailValidationService implements IEmailValidationService {
  constructor(private configService: ConfigService) {}
  async validate(email: string): Promise<AxiosResponse<EmaiValidationOutput>> {
    //
    const emailValidationKey =
      this.configService.get<string>('emailValidationKey');
    const emailValidationUrl =
      this.configService.get<string>('emailValidationUrl');
    const url = emailValidationUrl
      .replace(':key', emailValidationKey)
      .replace(':email', email);

    const result = await axios.get(url);
    return result;
  }

  //   async compare(password: string, hashPassword: string): Promise<boolean> {
  //     return await bcrypt.compare(password, hashPassword);
  //   }
}
