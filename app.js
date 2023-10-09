require("dotenv").config();

const express = require("express");
const session = require('express-session');
const path = require('path');
const rotas = require("./app/routes/router");

const app = express();
const port = process.env.PORT || 3000;

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'strict'
    }
}));

app.use(express.static(path.join(__dirname, 'app', 'public')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'app', 'views'));

app.use(express.json()); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/", rotas);

app.listen(port, () => {
  console.log(`Servidor ligado em http://localhost:${port}`);
});
