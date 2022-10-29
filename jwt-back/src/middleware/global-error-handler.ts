import {
  ExpressErrorMiddlewareInterface,
  Middleware,
  BadRequestError, 
} from 'routing-controllers';
import { Request, Response } from 'express';

interface MyError {
  statusCode: number;
}

@Middleware({
  type: 'after',
})
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(
    error: BadRequestError & MyError,
    request: Request,
    response: Response,
    next: (err?: any) => any
  ): void {
    // response.send({ ERROR: error });
    console.log(`error.statusCode=${error.statusCode}`);
    console.log(`error.httpCode=${error.httpCode}`)
    response.status(error.statusCode || error.httpCode).json(error);
    next();
  }
}
