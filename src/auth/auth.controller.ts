import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { loginDto, loginSchema } from './dto/login.dto';
import { ZodValidationPipe } from 'src/lib/zod.transform';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/register')
  async register(@Body() body) {
    return this.usersService.create(body);
  }

  @Post('/login')
  async login(@Body(new ZodValidationPipe(loginSchema)) body: loginDto) {
    return this.authService.login(body);
  }
}
