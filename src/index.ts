import bodyParser, { json } from 'body-parser';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';

console.log("Welcome to the TestProjectAlpha Alpha");

const app = express();

app.set('trust proxy', 1)

app.use(session({
    secret: 'teddy bear', 
    cookie: { maxAge: 60000 }
}))


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => 
{
    let session = req.session;
    console.log("Session id: ", session.id);


    let usersA = JSON.parse('{ "username":"admin", "password":"admin"}');
    console.log(usersA.username);

    if(session.id){
        res.sendFile(path.resolve(__dirname, 'index.html'));
    } else {
        res.sendFile(path.resolve(__dirname, 'login.html'));
    }
});

app.get('/login', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'login.html'));
});

app.post('/login', (req: Request, res: Response) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username == "admin" && password=="admin")
  {
  res.redirect('/');
  } 
  else 
  {
  res.send("Access Denied");
  }
});

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})

