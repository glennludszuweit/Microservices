import { Injectable } from '@nestjs/common';
import { GetUserEvent } from './get-user.event';

@Injectable()
export class AppService {
  private readonly users: any[] = [
    {
      userId: '123',
      stripeUserId: '43234',
    },
    {
      userId: '345',
      stripeUserId: '27279',
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  handleGetUser(getUserEvent: GetUserEvent) {
    return this.users.find((user) => user.userId === getUserEvent.userId);
  }
}
