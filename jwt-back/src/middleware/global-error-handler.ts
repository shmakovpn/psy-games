import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from 'routing-controllers';
import { Request, Response } from 'express';

@Middleware({
  type: 'after',
})
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(
    error: any,
    request: Request,
    response: Response,
    next: (err?: any) => any
  ): void {
    response.send({ ERROR: error });
    next();
  }
}
