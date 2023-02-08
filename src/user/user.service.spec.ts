import {
  HttpException,
  HttpStatus,
  NotAcceptableException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService, IBcryptService } from '../bcrypt/bcrypt.service';
import { PrismaService } from '../prisma/prisma.service';
import { Role, UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { faker } from '@faker-js/faker';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;
  let bcryptService: IBcryptService;

  const user = new UserEntity({
    name: faker.name.firstName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    role: Role.user,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService, BcryptService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    prismaService.user.findMany = jest.fn().mockReturnValue([]);
    prismaService.user.create = jest.fn().mockReturnValue(user);
    bcryptService = module.get<IBcryptService>(BcryptService);
    bcryptService.compare = jest.fn();
    bcryptService.hash = jest.fn().mockReturnValue('stringsecret');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should thrown error', async () => {
    await expect(
      service.create({
        email: 'diegodias@test.com',
        name: 'Diego Diaas',
        password: 'passwordrandmon',
        role: Role.admin,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
  it('should create successfully', async () => {
    expect(
      service.create({
        email: 'diegodias@testshouldpass.commm',
        name: 'Diego Dias Pass tesssst',
        password: 'passwordrandmonpasstest',
        role: Role.admin,
      }),
    ).resolves.toEqual(user);
  });
});
