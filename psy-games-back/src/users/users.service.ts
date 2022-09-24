import { Injectable } from '@nestjs/common';
import { User, UserWithPassword } from './user';

@Injectable()
export class UsersService {
  private readonly users: UserWithPassword[] = [
    {
      userId: 1,
      username: 'john',
      password: 'change',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<UserWithPassword | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
