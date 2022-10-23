import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import log4js from 'log4js';

dotenv.config();
const app: Application = express();
const port: number = Number(process.env.PORT);
const logger = log4js.getLogger();
logger.level = String(process.env.LOG_LEVEL);

// region test_logger
logger.info('log4js log info');
logger.debug('log4js log debug');
logger.error('log4js log error');
// endregion test_logger

app.use(bodyParser.json());

app.route('/api/login').post(loginRoute);
app.route('/').get(mainPage);

const RSA_PRIVATE_KEY = fs.readFileSync('keys/private.key');

app.listen(port, () => console.log(`Running on port=${port}`));

export function mainPage(req: Request, res: Response): void {
  res.send('<h1>Hello world</h1>');
}

export function loginRoute(req: Request, res: Response): void {
  console.log('process loginRoute');
  const email = req.body.email;
  const password = req.body.password;

  if (validateEmailAndPassword(email, password)) {
    const userId = findUserIdForEmail(email);

    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 120,
      subject: userId,
    });
    // res.cookie('SESSIONID', jwtBearerToken, { httpOnly: true});
    // res.cookie('SESSIONID', jwtBearerToken, { httpOnly: true, secure: true });  // force SSL
    res.status(200).json({
      idToken: jwtBearerToken,
      expiresIn: 'todo',
    });
  } else {
    // send status 401 Unauthorized
    res.sendStatus(401);
  }
}

function validateEmailAndPassword(email: string, password: string): boolean {
  console.log(
    `stub for validateEmailAndPassword(email=${email}, password=${password})`
  );
  return true;
}

function findUserIdForEmail(email: string): string {
  console.log('stub for findUserIdForEmail');
  return 'user_id';
}

console.log('END');
