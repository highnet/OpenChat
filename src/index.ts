import bodyParser, { json } from 'body-parser';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import fs from "fs";

// https://greensock.com/

// fs.readFileSync()

let validPasswords: Array<[string, string]> = [
    ["admin", "admin"]
];

let validAuthTokens: Array<string> = [

];

const app = express();

app.set('trust proxy', 1)

app.use(session({
    secret: 'teddy bear', 
    cookie: { maxAge: 10000 }
}))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => 
{
    let session = req.session;
    
    if (validAuthTokens.includes(session.id)){
        res.sendFile(path.resolve(__dirname, 'index.html'));
    } else {
       res.redirect('/login');
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
    validAuthTokens.push(req.session.id);
    res.redirect('/');
  } 
  else 
  {
    res.redirect('/login?err=LOGIN_INCORRECT')
  }
});

app.use('/static', express.static(path.join(__dirname, '..', 'static')));
app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})

