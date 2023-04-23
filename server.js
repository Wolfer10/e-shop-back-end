import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRouter from "./routes/users.js";
import productRouter from "./routes/products.js";
import passport from 'passport'

import bootstrapper from './db/bootstrapper.js'
import BaseError from './error/baseError.js';
import expressSession from 'express-session'
import loginRouter from "./routes/login.js"
import logoutRouter from "./routes/logout.js"
import registerRouter from "./routes/register.js"

import LocalStrategy from 'passport-local'
import UserService from './service/userService.js';
import cors from 'cors'



const app = express()

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
});

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function () {
  console.log('Connected to MongoDB successfully!')
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors({
  origin: 'http://localhost:4200', // replace with your Angular app URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'responseType'],
  credentials: true // enable CORS with credentials (cookies)
}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(cookieParser());


bootstrapper()


passport.use(new LocalStrategy(async (username, password, done) => {
 
  const user = await UserService.findUserByName(username);

  if (!user) {
    return done("Nincs ilyen user", null);
  }
  const passwordIsValid = await user.comparePasswords(password);
  if (!passwordIsValid) {
    return done("Rossz jelszó", false);
  }
  return done(null, user);
}));


passport.serializeUser(function (user, done) {
  if (!user) return done('nincs megadva beléptethető felhasználó', null);
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  if (!user) return done("nincs user akit kiléptethetnénk", null);
  return done(null, user);
});

app.use(expressSession({ secret: 'prf2021lassananodejsvegereerunk2', resave: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    console.log('Here');
    res.json({message: "Hello"})
})

app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/login", loginRouter)
app.use("/logout", logoutRouter)
app.use("/register", registerRouter)




app.use((err, req, res, next) => {
  console.trace(err);
  if(err instanceof BaseError){
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send('Oops! Something is broken');
})


app.listen(3000)