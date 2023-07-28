// import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmailValidationService } from '../email/emailValidation.service';
import { BcryptService, IBcryptService } from '../bcrypt/bcrypt.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Role, UserEntity } from './entities/user.entity';
import { JWTService } from '../jwt/jwt.service';
import { validateOrReject } from 'class-validator';

async function validateOrRejectInput(input) {
  try {
    await validateOrReject(input);
  } catch (errors) {
    console.log(
      'Caught promise rejection (validation failed). Errors: ',
      errors,
    );
  }
}

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly bcryptService: BcryptService,
    private readonly emailValidationService: EmailValidationService,
    private readonly jwtService: JWTService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const inputValidation = await validateOrRejectInput(createUserInput);
    console.log(inputValidation);

    const { name, password, email, role } = createUserInput;

    const validation = await this.emailValidationService.validate(email);

    const isDeliverable = validation.data.deliverability;
    const IsValidFormat = validation.data.is_valid_format.value;

    if (isDeliverable !== 'DELIVERABLE') {
      throw new HttpException(
        'Email does not contain a valid email box',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!IsValidFormat) {
      throw new HttpException(
        'Email are not formatted correctly',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const userNameAlreadyRegistered = await this.prisma.user.findMany({
      where: { name: name },
    });
    const emailAlreadyRegistered = await this.prisma.user.findMany({
      where: { email: email },
    });

    if (userNameAlreadyRegistered.length > 0) {
      throw new HttpException(
        'User already registered',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    if (emailAlreadyRegistered.length > 0) {
      throw new HttpException(
        'E-mail already registered',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const finalhashedpwd = await this.bcryptService.hash(password);

    const user = new UserEntity({
      name: name,
      password: finalhashedpwd,
      email: email,
      role: Role.user,
    });

    return this.prisma.user.create({
      data: {
        id: user.id,
        createdAt: user.createdAt,
        email: user.email,
        name: user.name,
        password: finalhashedpwd,
        role: user.role,
      },
      select: {
        name: true,
        email: true,
        createdAt: true,
        password: false,
        role: false,
        id: true,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        password: false,
        role: false,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        password: false,
        role: false,
      },
    });
  }

  findByNameEmail(name: string, email: string) {
    return this.prisma.user.findMany({
      where: {
        name: name,
        email: email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        password: false,
        role: false,
      },
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async loginUser(name: string, password: string, email?: string) {
    const userLogging = await this.prisma.user.findMany({
      where: {
        name: name,
        // email: email,
      },
    });

    if (!userLogging[0]) {
      throw new HttpException(
        'User not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const comparison = await this.bcryptService.compare(
      password,
      userLogging[0].password,
    );

    if (comparison) {
      //IMPLEMENT JWT TOKEN
      const authToken = await this.jwtService.sign(name);
      console.log(authToken);
      return authToken;
    } else
      throw new HttpException(
        'Passwords dont match',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  // async report() {
  //   const users = this.prisma.user.findMany();
  // }
}
