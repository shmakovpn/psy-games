import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User, UserWithPassword } from 'src/users/user';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './userPayload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user: UserWithPassword = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload: UserPayload = {
      username: user.username,
      sub: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
