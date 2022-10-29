import {
  Controller,
  Get,
  Param,
  Body,
  UseBefore,
  UseAfter,
  UseInterceptor,
  Post,
  OnUndefined,
} from 'routing-controllers';
import { loggingBefore, loggingAfter } from '../middleware/middleware';
import 'reflect-metadata';
import { Info } from '../model/info';
import { AuthInfo } from '../model/auth';
import fs from 'fs';
import jwt from 'jsonwebtoken';

const RSA_PRIVATE_KEY = fs.readFileSync('./keys/private.key');

@Controller()
// @UseBefore(loggingBefore)
// @UseAfter(loggingAfter)
// @UseInterceptor(function (action: Action, context: any): any {
//   console.log('change response ...');
//   context = 'interceptor';
//   return context;
// })
export class UserController {
  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return `This action returns user #${id}`;
  }

  @Post('/users/:id')
  @OnUndefined(204)
  postOne(@Param('id') id: number, @Body() info: Info) {
    console.log(JSON.stringify(info));
    // return `postOne`;
  }

  @Post('/api/login')
  @UseBefore(loggingBefore)
  @UseAfter(loggingAfter)
  @OnUndefined(401)
  postLogin(@Body() authInfo: AuthInfo) {
    console.log(`authInfo=${JSON.stringify(authInfo)}`);
    if (this.validateEmailAndPassword(authInfo.email, authInfo.password)) {
      const userId = this.findUserIdForEmail(authInfo.email);
      const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: 120,
        subject: userId,
      });
      return {
        idToken: jwtBearerToken,
        expiresIn: new Date(),
      };
    }
  }

  findUserIdForEmail(email: string): string {
    return email;
  }

  validateEmailAndPassword(email: string, password: string): boolean {
    return !!email && !!password;
  }
}
