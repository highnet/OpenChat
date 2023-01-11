"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
// https://expressjs.com/en/starter/static-files.html
let validPasswords = [
    ["admin", "admin"]
];
let validAuthTokens = [];
const app = (0, express_1.default)();
app.set('trust proxy', 1);
app.use((0, express_session_1.default)({
    secret: 'teddy bear',
    cookie: { maxAge: 10000 }
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    let session = req.session;
    if (validAuthTokens.includes(session.id)) {
        res.sendFile(path_1.default.resolve(__dirname, 'index.html'));
    }
    else {
        res.redirect('/login');
    }
});
app.get('/login', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, 'login.html'));
});
app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username == "admin" && password == "admin") {
        validAuthTokens.push(req.session.id);
        res.redirect('/');
    }
    else {
        res.send("Access Denied");
    }
});
app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});
