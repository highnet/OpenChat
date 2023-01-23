import bodyParser, { json } from 'body-parser';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import { ActiveChatters } from './activeChatters';

// https://greensock.com/

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

let users = JSON.parse(fs.readFileSync('users.json','utf8'));

let validAuths: string[] = [];

let activeChatters = new ActiveChatters();
    
function generateRandomNickname(){
        let result = "";
        const adjectives = ["Dopey", "Doc", "Sneezy", "Bashful", "Sleepy", "Grumpy", "Happy"];
        const subjectives = ["Car", "Dog", "House", "Moon", "Water", "Table", "Trouble"];
        let randomAdjective = adjectives[Math.floor(Math.random()*adjectives.length)];
        let randomSubjective = subjectives[Math.floor(Math.random()*subjectives.length)];
        result += randomAdjective;
        result += randomSubjective;
        result += Math.floor(Math.random() * 90 + 10); 
        return result; 
}
    

import http from 'http';
let server = http.createServer(app);
import { Server } from "socket.io";
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
  for(let user of users){
    if (usernameInput == user.username && passwordInput == user.password){
      validCredentials = true;
      break;
    }
  }

  if (validCredentials){
    validAuths.push(session.id);
    console.log("Redirecting to /");
    res.redirect('/');
  } else {
    res.redirect('/login?err=LOGIN_INCORRECT')
  }

});

io.on('connection', (socket) => {
  console.log('a user connected');
  let newClientUserUniqueID = uuidv4();
  let newNickname = generateRandomNickname();
  activeChatters.GenerateNewUser(newClientUserUniqueID, newNickname);
  console.log(activeChatters.ActiveUuids);
  console.log(activeChatters.ActiveNicknames);
  socket.emit("you logged in", newClientUserUniqueID, newNickname, activeChatters);
  socket.broadcast.emit("a client logged in", activeChatters);
  
  socket.on('disconnect', () => {

    activeChatters.RemoveUser(newClientUserUniqueID,newNickname);
  

    socket.broadcast.emit("a client logged out", activeChatters);
  });

  socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
      console.log(msg);
  });
});

server.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})



