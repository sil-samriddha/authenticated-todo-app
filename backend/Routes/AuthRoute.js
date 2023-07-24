const express = require('express');
const { Check, Signin, CreateUser, VerifyUser } = require('../Controller/AuthControl');

const app = express();



app.use(express.json());

const AuthRoute = express.Router();

AuthRoute.post('/signin', Check, Signin);
AuthRoute.post('/signup', CreateUser);
AuthRoute.post('/verify', VerifyUser);

module.exports = AuthRoute;