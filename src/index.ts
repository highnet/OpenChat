//#region Imports

import bodyParser, { json } from "body-parser";
import express, { Express, Request, Response } from "express";
import path from "path";
import session from "express-session";
import fs from "fs";
import http from "http";
import { Server } from "socket.io";
import { Users } from "./users";
import { CredentialValidator } from "./credentialValidator";
import { Credential } from "./credential";

//#endregion Imports

//#region Enums

/*
  ServerEmissions describes the different types of
  emissions that can be emited by the server to the client
  the client has an equivalent definition of ServerEmissions
*/
enum ServerEmissions {
  YOU_LOGGED_IN = "you logged in",
  A_CLIENT_LOGGED_IN = "a client logged in",
  A_CLIENT_LOGGED_OUT = "a client logged out",
  CHAT_MESSAGE = "chat message",
}

/*
  ServerEvents describes the different types of server events
*/
enum ServerEvents {
  CONNECTION = "connection",
  DISCONNECT = "disconnect",
}

//#endregion Enums

//#region App Setup

const app = express(); // Create an express application

app.set("trust proxy", 1); // Enable reverse proxy support

app.use(
  session({
    secret: "teddy bear",
    cookie: { maxAge: 100000000000000 },
    resave: false,
    saveUninitialized: true,
  })
); // Define session configuration

app.use(bodyParser.urlencoded({ extended: false })); // enable the middleware for parsing bodies
app.use(bodyParser.json()); // enable the middleware for parsing json
app.use("/static", express.static(path.join(__dirname, "..", "static")));

//#endregion App Setup

//#region Global

let validLogins = JSON.parse(fs.readFileSync("logins.json", "utf8")); // cache the JSON file containing the list of valid logins
let validAuths: string[] = []; // initialize the list used to cache valid auth tokens
let connectedUsers = new Users(); // initialize the object used to cache a list of users connected to the server
let server = http.createServer(app); // create an http server
let io = new Server(server); // create a socket.io server
let credentialValidator = new CredentialValidator();

//#endregion Global

//#region Post/Get

app.get("/", (req: Request, res: Response) => {
  let session = req.session;

  // Validate the session
  let validAuth: boolean = false;
  for (let auth of validAuths) {
    if (session.id == auth) {
      validAuth = true;
      break;
    }
  }

  // Redirect the user according to the validation's result
  if (validAuth) {
    res.sendFile(path.resolve(__dirname, "../views/index.html"));
  } else {
    res.redirect("/login");
  }
});

app.get("/login", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../views/login.html"));
});

app.post("/login", (req: Request, res: Response) => {
  // Query the user's login credentials
  let credential = new Credential(req.body.username, req.body.password);

  // Validate the user's credentials
  let validCredentials = credentialValidator.ValidateCredentials(
    validLogins,
    credential
  );

  // Redirect the user according to the credential validator results
  if (validCredentials) {
    validAuths.push(req.session.id);
    res.redirect("/");
  } else {
    res.redirect("/login?err=LOGIN_INCORRECT");
  }
});

//#endregion Post/Get

//#region Socket

io.on(ServerEvents.CONNECTION, (socket) => {
  // Generate a new server side user
  let connectedUser = connectedUsers.GenerateNewUser();

  /*
   Emit a YOU_LOGGED_IN ServerEmisssion to the user, including their newly
   assigned uuid, nickname, and a list of all other connected users
  */
  socket.emit(
    ServerEmissions.YOU_LOGGED_IN,
    connectedUser.Uuid,
    connectedUser.Nickname,
    connectedUsers
  );

  /*
    Broadcast emit a A_CLIENT_LOGGED_IN ServerEmission to all users,
    including a list of all other currently connected users
  */
  socket.broadcast.emit(ServerEmissions.A_CLIENT_LOGGED_IN, connectedUsers);

  socket.on(ServerEvents.DISCONNECT, () => {
    connectedUsers.RemoveOldUser(connectedUser); // Remove the user from the list of connected users
    /*
      Broadcast a A_CLIENT_LOGGED_OUT ServerEmission to all users,
      including a list of all other currently connected users
    */
    socket.broadcast.emit(ServerEmissions.A_CLIENT_LOGGED_OUT, connectedUsers);
  });

  socket.on(ServerEmissions.CHAT_MESSAGE, (msg) => {
    /*
      Emit a CHAT_MESSAGE server emission to all users,
      including the message itself
    */
    io.emit(ServerEmissions.CHAT_MESSAGE, msg);
    console.log(msg);
  });
});

server.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});
//#endregion Socket
