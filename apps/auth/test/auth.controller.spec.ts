import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth.controller';
import { AuthService } from '../src/auth.service';
import { RegisterUserDto } from '../src/dto/register-user.dto';
import { LoginUserDto } from '../src/dto/login-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should call register on service', async () => {
    const dto: RegisterUserDto = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test',
    };
    (service.register as jest.Mock).mockResolvedValue('result');

    const result = await controller.register(dto);
    expect(service.register).toHaveBeenCalledWith(dto);
    expect(result).toBe('result');
  });

  it('should call login on service', async () => {
    const dto: LoginUserDto = { email: 'test@example.com', password: 'password' };
    (service.login as jest.Mock).mockResolvedValue('result');

    const result = await controller.login(dto);
    expect(service.login).toHaveBeenCalledWith(dto);
    expect(result).toBe('result');
  });

  it('should call validateUser on service', async () => {
    (service.validateUser as jest.Mock).mockResolvedValue('user');
    const result = await controller.validate('123');
    expect(service.validateUser).toHaveBeenCalledWith('123');
    expect(result).toBe('user');
  });
});
