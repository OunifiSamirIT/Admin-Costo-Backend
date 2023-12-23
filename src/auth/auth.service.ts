import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly revokedTokens: Set<string> = new Set();
  
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(body) {
    /* find user  */
    const user = await this.usersService.findUserByEmail(body.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.checkUser(user, body);

    /* creation token */
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const access = await this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_ACCESS,
      expiresIn: '1d',
    });
    const refresh = await this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_REFRESH,
      expiresIn: '10d',
    });

    return { user: payload, access, refresh };
  }


  async logout(token: string) {
    this.revokedTokens.add(token);
  }
  async verifyToken(token: string): Promise<boolean> {
    return !this.revokedTokens.has(token);
  }

  async checkUser(user: User, body) {
    if (user && !(await compare(body.password, user.password))) {
      throw new UnauthorizedException('Passwords not matches');
    }
  }
}
