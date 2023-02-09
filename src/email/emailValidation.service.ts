import { Injectable } from '@nestjs/common';
import { EmaiValidationOutput } from './dto/email-validation-output';
import axios, { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

export interface EmailNotValidated {
  data: Partial<EmaiValidationOutput>;
}

export interface IEmailValidationService {
  validate(
    email: string,
  ): Promise<EmailNotValidated | AxiosResponse<EmaiValidationOutput>>;
}

@Injectable()
export class EmailValidationService implements IEmailValidationService {
  constructor(private configService: ConfigService) {}
  async validate(
    email: string,
  ): Promise<EmailNotValidated | AxiosResponse<EmaiValidationOutput>> {
    //
    const emailValidationFeatureFlag = this.configService.get<string>(
      'emailValidationFeatureFlag',
    );

    if (emailValidationFeatureFlag == 'false') {
      return {
        data: {
          deliverability: 'DELIVERABLE',
          is_valid_format: { value: true, text: 'TRUE' },
        },
      };
    }

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
}
