import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
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

  @Post('/logout')
  @HttpCode(200) // Set the HTTP response code to 200 for successful logout
  async logout(@Headers('authorization') authorizationHeader: string) {
    if (!authorizationHeader) {
      // If authorization header is missing, return a response indicating that the user is already logged out
      return { message: 'User is already logged out' };
    }

    const tokenParts = authorizationHeader.split(' ');
    if (tokenParts.length !== 2) {
      // If the token format is incorrect, return an error response
      return { error: 'Invalid token format' };
    }

    const token = tokenParts[1];
    await this.authService.logout(token);
    
    return { message: 'Logout successful' };
  }
}
