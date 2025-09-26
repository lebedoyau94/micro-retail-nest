jest.mock('argon2', () => ({
  hash: jest.fn(),
  verify: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from '../src/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let repo: Repository<User>;
  let jwt: JwtService;

  const mockUser: User = {
    id: '123',
    email: 'test@example.com',
    password: 'hashedpass',
    name: 'Test',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('signed-jwt'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repo = module.get(getRepositoryToken(User));
    jwt = module.get(JwtService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      (repo.findOne as jest.Mock).mockResolvedValue(null);
      (repo.create as jest.Mock).mockReturnValue(mockUser);
      (repo.save as jest.Mock).mockResolvedValue(mockUser);
      jest.spyOn(argon2, 'hash').mockResolvedValue('hashedpass' as never);

      const result = await service.register({
        email: 'test@example.com',
        password: 'password',
        name: 'Test',
      });

      expect(repo.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(result.access_token).toBe('signed-jwt');
    });

    it('should throw if email exists', async () => {
      (repo.findOne as jest.Mock).mockResolvedValue(mockUser);

      await expect(
        service.register({
          email: 'test@example.com',
          password: 'password',
          name: 'Test',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should login with correct credentials', async () => {
      (repo.findOne as jest.Mock).mockResolvedValue({
        ...mockUser,
        password: await argon2.hash('password'),
      });

      jest.spyOn(argon2, 'verify').mockResolvedValue(true as never);

      const result = await service.login({
        email: 'test@example.com',
        password: 'password',
      });

      expect(result.access_token).toBe('signed-jwt');
    });

    it('should throw with invalid credentials', async () => {
      (repo.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        service.login({
          email: 'wrong@example.com',
          password: 'password',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validateUser', () => {
    it('should return user if found', async () => {
      (repo.findOne as jest.Mock).mockResolvedValue(mockUser);
      const result = await service.validateUser('123');
      expect(result).toEqual(mockUser);
    });
  });
});
