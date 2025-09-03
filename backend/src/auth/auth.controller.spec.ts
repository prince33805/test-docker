import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../../prisma/prisma.module';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [PrismaModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service.login and return access token', async () => {
    const result = { accessToken: 'jwt-token' };
    jest.spyOn(service, 'validateUser').mockResolvedValue(result);

    const dto = { email: 'a@a.aa', password: 'aaaaaa' };
    expect(await controller.login(dto)).toEqual(result);
    expect(service.validateUser).toHaveBeenCalledWith(dto);
  });

  it('service.register and return user', async () => {
    const result = { id: 1, email: 'test@example.com', password: 'aaabbb' , role: 'user' };
    jest.spyOn(service, 'create').mockResolvedValue(result);

    const dto = { email: 'test@example.com', password: '123456' };
    expect(await controller.create(dto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
