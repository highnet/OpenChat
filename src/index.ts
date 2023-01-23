//#region Imports

import bodyParser, { json } from 'body-parser';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import fs from "fs";
import http from 'http';
import { Server } from "socket.io";
import { Users } from './users';

//#endregion Imports


//#region Enums

/*
  ServerEmissions describes the different types of
  emissions that can be emited by the server to the client
  the client has an equivalent definition of ServerEmissions
*/
enum ServerEmissions{
  YOU_LOGGED_IN = "you logged in",
  A_CLIENT_LOGGED_IN = "a client logged in",
  A_CLIENT_LOGGED_OUT = "a client logged out",
  CHAT_MESSAGE = "chat message"
}

/*
  ServerEvents describes the different types of server events
*/
enum ServerEvents{
  CONNECTION = "connection",
  DISCONNECT = "disconnect"
}

//#endregion Enums


//#region App Setup

const app = express(); // Create an express application

app.set('trust proxy', 1); // Enable reverse proxy support

app.use(
  session({
    secret: 'teddy bear',
    cookie: { maxAge: 100000000000000 }, 
    resave: false,
    saveUninitialized: true
})); // Define session configuration

app.use(bodyParser.urlencoded({ extended: false })); // enable the middleware for parsing bodies
app.use(bodyParser.json()); // enable the middleware for parsing json
app.use('/static', express.static(path.join(__dirname, '..', 'static')));

//#endregion App Setup

//#region Global

let validLogins = JSON.parse(
  fs.readFileSync(
    'logins.json',
    'utf8'
)); // cache the JSON file containing the list of valid logins
let validAuths: string[] = []; // initialize the list used to cache valid auth tokens
let connectedUsers = new Users(); // initialize the object used to cache a list of users connected to the server
let server = http.createServer(app);
let io = new Server(server);

//#endregion Global


//#region Post/Get

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

//#endregion Post/Get

//#region Socket
io.on(ServerEvents.CONNECTION, (socket) => {
  
  let connectedUser = connectedUsers.GenerateNewUser();
  
  socket.emit(ServerEmissions.YOU_LOGGED_IN, connectedUser.Uuid, connectedUser.Nickname, connectedUsers);
  socket.broadcast.emit(ServerEmissions.A_CLIENT_LOGGED_IN, connectedUsers);
  
  socket.on(ServerEvents.DISCONNECT, () => {

    connectedUsers.RemoveOldUser(connectedUser);
    socket.broadcast.emit(ServerEmissions.A_CLIENT_LOGGED_OUT, connectedUsers);

  });

  socket.on(ServerEmissions.CHAT_MESSAGE, (msg) => {
      io.emit(ServerEmissions.CHAT_MESSAGE, msg);
      console.log(msg);
  });
});

server.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})
//#endregion Socket