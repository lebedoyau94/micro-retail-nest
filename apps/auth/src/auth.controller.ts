import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthPatterns } from '@shared-kernel';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AuthPatterns.USER_REGISTER)
  register(@Payload() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @MessagePattern(AuthPatterns.USER_LOGIN)
  login(@Payload() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @MessagePattern(AuthPatterns.AUTH_VALIDATE)
  validate(@Payload() userId: string) {
    return this.authService.validateUser(userId);
  }
}
