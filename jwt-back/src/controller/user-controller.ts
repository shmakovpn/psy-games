import {
  Controller,
  Get,
  Param,
  Body,
  UseBefore,
  UseAfter,
  UseInterceptor,
  Action,
  Post,
  OnUndefined,
} from 'routing-controllers';
import { loggingBefore, loggingAfter } from '../middleware/middleware';
import 'reflect-metadata';

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
  postOne(@Param('id') id: number, @Body() info: any): void {
    console.log(JSON.stringify(info))
  }
}
