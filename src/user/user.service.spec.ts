import {
  HttpException,
  HttpStatus,
  NotAcceptableException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from './entities/user.entity';
import { UserService } from './user.service';

jest.mock('bcrypt');

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
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
    await expect(
      service.create({
        email: 'diegodias@testshouldpass.com',
        name: 'Diego Dias Pass test',
        password: 'passwordrandmonpasstest',
        role: Role.admin,
      }),
    ).resolves.toEqual(true);
  });
});
