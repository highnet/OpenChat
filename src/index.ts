import bodyParser, { json } from 'body-parser';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import fs from "fs";

// https://greensock.com/

// websockets for chat

// socket.io

const app = express();

app.set('trust proxy', 1)

app.use(session({
    secret: 'teddy bear', 
    cookie: { maxAge: 1000000 },
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

let users = JSON.parse(fs.readFileSync('users.json','utf8'));

let auths: string[] = [];

app.get('/', (req: Request, res: Response) => 
{
  let session = req.session;
  let validAuth: boolean = false;
  
  console.log("session ID:", session.id);

  // auths = JSON.parse(fs.readFileSync('auths.json','utf8'));

  for(let auth of auths){
    console.log(auth);
    if (session.id == auth){
      validAuth = true;
      break;
    }
  }

  if (validAuth){
    console.log("Valid Authentication");
    res.sendFile(path.resolve(__dirname, '../views/index.html'));
  } else {
    console.log("Invalid Authentication");
    console.log("Redirecting to login");
    res.redirect('/login');
  }

});


app.get('/login', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../views/login.html'));
});

app.post('/login', (req: Request, res: Response) => {
  let usernameInput = req.body.username;
  let passwordInput = req.body.password;
  let session = req.session;

  console.log("session ID:", session.id);

  let validCredentials: boolean = false;
  for(let user of users){
    if (usernameInput == user.username && passwordInput == user.password){
      validCredentials = true;
      break;
    }
  }

  if (validCredentials){
    auths.push(session.id);
    fs.writeFileSync('auths.json', JSON.stringify(auths),'utf8');
    console.log("Redirecting to /");
    res.redirect('/');
  } else {
    res.redirect('/login?err=LOGIN_INCORRECT')
  }
});

app.use('/static', express.static(path.join(__dirname, '..', 'static')));
app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})