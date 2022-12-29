// import { Injectable } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Role, UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(createUserInput: CreateUserInput) {
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
    console.log(user.password);
    console.log(user.role);
    return this.prisma.user.create({
      data: {
        id: user.id,
        createdAt: user.createdAt,
        email: user.email,
        name: user.name,
        password: user.password,
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
