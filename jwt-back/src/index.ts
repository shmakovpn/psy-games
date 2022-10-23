import { Request, Response, Application } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

const app: Application = express();
const port: number = 5000;

app.use(bodyParser.json());

app.route('/api/login').post(loginRoute);
app.route('/').get(mainPage);

const RSA_PRIVATE_KEY = fs.readFileSync('keys/private.key');

app.listen(port, () => console.log(`Running on port=${port}`));

export function mainPage(req: Request, res: Response) {
  res.send('<h1>Hello world</h1>');
}

export function loginRoute(req: Request, res: Response) {
  console.log('process loginRoute');
  const email = req.body.email;
  const password = req.body.password;

  if (validateEmailAndPassword()) {
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

function validateEmailAndPassword(): boolean {
  console.log('stub for validateEmailAndPassword');
  return true;
}

function findUserIdForEmail(email: string): string {
  console.log('stub for findUserIdForEmail');
  return 'user_id';
}

console.log('END');
