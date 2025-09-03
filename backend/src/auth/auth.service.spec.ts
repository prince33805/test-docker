import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        {
          provide: JwtService,
          useValue: new JwtService({ secret: 'mySecretKey' }),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwt = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return null if user not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

      await expect(() => service.validateUser({
        email: 'test@example.com',
        password: '123456',
      })).rejects.toThrow(HttpException);
    });

    it('should return null if password is incorrect', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: 'wrong-password',
        role: 'user',
      });
      await expect(() => service.validateUser({
        email: 'test@example.com',
        password: '123456',
      })).rejects.toThrow(HttpException);
    });

    it('should return access token if user is found and password is correct', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({
        email: 'test@example.com',
        password: '123456',
        id: 1,
        role: 'user',
      });
      const result = await service.validateUser({
        email: 'test@example.com',
        password: '123456',
      });
      expect(result).toHaveProperty('accessToken');
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      jest.spyOn(prisma.user, 'create').mockResolvedValue({
        email: 'test@example.com',
        password: '123456',
        id: 1,
        role: 'user',
      });
      const result = await service.create({
        email: 'test@example.com',
        password: '123456',
      });
      expect(result).toHaveProperty('email', 'test@example.com');
      expect(result).toHaveProperty('password', '123456');
      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('role', 'user');
    });

    it('should throw HttpException if database creation fails', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: '123456',
      };
      jest.spyOn(prisma.user, 'create').mockRejectedValue(new Error('Database creation failed'));
      try {
        await service.create(createUserDto);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toContain('Database created failed');
      }
    });
  });
});