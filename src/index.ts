import bodyParser, { json } from 'body-parser';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import fs from "fs";
import http from 'http';
import { Server } from "socket.io";
import { Users } from './users';

// https://greensock.com/

enum ServerEmissions{
  YOU_LOGGED_IN = "you logged in",
  A_CLIENT_LOGGED_IN = "a client logged in",
  A_CLIENT_LOGGED_OUT = "a client logged out",
  CHAT_MESSAGE = "chat message"
}

enum ServerEvents{
  CONNECTION = "connection",
  DISCONNECT = "disconnect"
}

const app = express();
app.set('trust proxy', 1)

app.use(session({
    secret: 'teddy bear', 
    cookie: { maxAge: 100000000000000 },
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/static', express.static(path.join(__dirname, '..', 'static')));

let validLogins = JSON.parse(fs.readFileSync('logins.json','utf8'));
let validAuths: string[] = [];
let activeUsers = new Users();
let server = http.createServer(app);
let io = new Server(server);

app.get('/', (req: Request, res: Response) => 
{
  let session = req.session;
  let validAuth: boolean = false;

  for(let auth of validAuths){
    if (session.id == auth){
      validAuth = true;
      break;
    }
  }

  if (validAuth){
    res.sendFile(path.resolve(__dirname, '../views/index.html'));
  } else {
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

  let validCredentials: boolean = false;
  for(let user of validLogins){
    if (usernameInput == user.username && passwordInput == user.password){
      validCredentials = true;
      break;
    }
  }

  if (validCredentials){
    validAuths.push(session.id);
    res.redirect('/');
  } else {
    res.redirect('/login?err=LOGIN_INCORRECT')
  }

});

io.on(ServerEvents.CONNECTION, (socket) => {
  
  let newUser = activeUsers.GenerateNewUser();
  
  socket.emit(ServerEmissions.YOU_LOGGED_IN, newUser.Uuid, newUser.Nickname, activeUsers);
  socket.broadcast.emit(ServerEmissions.A_CLIENT_LOGGED_IN, activeUsers);
  
  socket.on(ServerEvents.DISCONNECT, () => {

    activeUsers.RemoveOldUser(newUser);
    socket.broadcast.emit(ServerEmissions.A_CLIENT_LOGGED_OUT, activeUsers);

  });

  socket.on(ServerEmissions.CHAT_MESSAGE, (msg) => {
      io.emit(ServerEmissions.CHAT_MESSAGE, msg);
      console.log(msg);
  });
});

server.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})



