import {
  Controller,
  Get,
  Param,
  UseBefore,
  UseAfter,
  UseInterceptor,
  Action,
} from 'routing-controllers';
import { loggingBefore, loggingAfter } from '../middleware/middleware';
import 'reflect-metadata';

@Controller()
@UseBefore(loggingBefore)
@UseAfter(loggingAfter)
@UseInterceptor(function (action: Action, context: any): any {
  console.log('change response ...');
  context = 'interceptor';
  return context;
})
export class UserController {
  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return `This action returns user #${id}`;
  }
}
