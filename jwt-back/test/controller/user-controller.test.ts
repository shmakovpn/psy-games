import bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';
import express, { Express } from 'express';
import { UserController } from '../../src/controller/user-controller';
import { Info } from '../../src/model/info';
import { GlobalErrorHandler } from '../../src/middleware/global-error-handler';
import request, { Response } from 'supertest';

interface MyResponse {
  body: string;
}

interface MyError {}

describe('UserController', () => {
  let server: Express | null = null;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeAll( async () => {
    server = express();
    server.use(bodyParser.json());
    useExpressServer(server, {
      controllers: [UserController],
      middlewares: [GlobalErrorHandler],
      defaultErrorHandler: false,
    });
  });

  it('postOne', () => {
    const userController = new UserController();
    const testBody = {
      city: 'Spb',
    };
    const res = userController.postOne(1, testBody as Info);
    expect(res).toBeUndefined();
  });

  it('postOne with validators', (done) => {
    request(server)
      .post('/users/1')
      .send({
        country: 'Russia',
        city: 'SPb',
      } as Info)
      .expect(204)
      .end((err: MyError, res: Response) => {
        if (err) throw new Error(JSON.stringify(res.body));
        done();
      });
  });
});
