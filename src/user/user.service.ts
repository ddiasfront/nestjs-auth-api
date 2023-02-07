// import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BcryptService, IBcryptService } from '../bcrypt/bcrypt.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Role, UserEntity } from './entities/user.entity';

// IMPLEMENT THE HASH PASSWORD FUNCTION.

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const userNameAlreadyRegistered = await this.prisma.user.findMany({
      where: { name: createUserInput.name },
    });
    const emailAlreadyRegistered = await this.prisma.user.findMany({
      where: { email: createUserInput.email },
    });
    console.log(userNameAlreadyRegistered);

    if (userNameAlreadyRegistered.length > 0) {
      console.log(userNameAlreadyRegistered);
      throw new HttpException(
        'User already registered',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    if (emailAlreadyRegistered.length > 0) {
      console.log(emailAlreadyRegistered);
      throw new HttpException(
        'E-mail already registered',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // Store hash in your password DB.

    console.log(this.bcryptService);

    const finalhashedpwd = await this.bcryptService.hash(
      createUserInput.password,
    );

    console.log(finalhashedpwd, 'finalhashedpwd');
    const user = new UserEntity({
      name: createUserInput.name,
      password: createUserInput.password,
      email: createUserInput.email,
      role: Role.user,
    });
    console.log({ user });
    console.log(user.id);
    console.log(user.createdAt);
    console.log(user.email);
    // console.log(hash);
    console.log(user.role);
    return this.prisma.user.create({
      data: {
        id: user.id,
        createdAt: user.createdAt,
        email: user.email,
        name: user.name,
        password: 'test',
        role: user.role,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
