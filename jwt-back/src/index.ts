import express, { Express, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import httpContext from 'express-http-context';
import { useExpressServer } from 'routing-controllers';
import { UserController } from './controller/user-controller';

import * as fs from 'fs';
import * as dotenv from 'dotenv';
import log4js from 'log4js';
import { GlobalErrorHandler } from './middleware/global-error-handler';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger/openapi.json';
import cors from 'cors';

dotenv.config();
const port: number = Number(process.env.PORT);
const logger = log4js.getLogger();
logger.level = String(process.env.LOG_LEVEL);

// region test_logger
logger.info('log4js log info');
logger.debug('log4js log debug');
logger.error('log4js log error');
// endregion test_logger

const RSA_PRIVATE_KEY = fs.readFileSync('keys/private.key');

const app: Express = express();
app.use(cors() as RequestHandler);
app.use(bodyParser.json());
app.use(httpContext.middleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
useExpressServer(app, {
  controllers: [UserController],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false,
});

app.use((req, res, next) => {
  httpContext.ns.bindEmitter(req);
  httpContext.ns.bindEmitter(res);
  next();
});

app.listen(port, () => console.log(`Running on port ${port}`));
