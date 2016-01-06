/**
 * This is compiled to the root of the project (server.js) so all import paths should be relative to that location
 */

import React from 'react';
import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import ECT from 'ect';
import User from './models/user';
import routes from 'routes//';
import configureStore from './store';
import tocify from './lib/tocify';
import initialData from './initialData';
import menuView from './views/menuView';
import excerpt from './views/excerpt';
import preview from './views/preview';

let webpack, webpackDevMiddleware, webpackHotMiddleware, config;
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const ectRenderer = ECT({ watch: true, root: './src/server/views', ext : '.ect' });

import 'source-map-support/register';

// Views
app.set('views', './src/server/views');
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

// Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Sessions
mongoose.connect(process.env['MONGO_URI']);

var sessionStore = new MongoDBStore( {
  uri: process.env['MONGO_URI']
});

// Catch errors
sessionStore.on('error', function(error) {
  console.log(error);
});

let sess = {
  resave: true,
  saveUninitialized: false,
  secret: process.env['SESSION_SECRET'],
  store: sessionStore,
  cookie: { httpOnly: true, domain: process.env['SESSION_DOMAIN']}
};

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/assets', express.static('./_docpress/assets'));

app.get('/downloads/:format', (req, res) => {
  if(!req.user) {
    res.status(403).send('Please Login');
    return;
  }

  try {
    const file = path.resolve(`./build/ThinkingInReact.${req.params.format}`);
    const stats = fs.statSync(file);
    res.download(file);
  }
  catch (e) {
    res.status(404).send('Not available in that format');
  }
});

app.get('/', (req, res) => {
  res.redirect('/index.html');
});

app.get('/:chapter.html', (req, res) => {
  try {
    let file = path.resolve(`./_docpress/${req.params.chapter}.html`);
    let html = fs.readFileSync(file, 'utf8');
    let $ = cheerio.load(html);

    $('.header-nav').prepend(menuView(req, res));
    $('.submenu > li > span').each(function(i, elem) {
      $(elem).attr('title', 'Unfinished Chapter');
      $(elem).addClass('unfinished');
    });

    res.send($.html());
  }
   catch (e) {
    console.log(e);
    res.status(404).send(`That Chapter Doesn't exist`);
  }
});

app.get('/:chapter/:subchapter.html', (req, res) => {
  let file = path.resolve(`./_docpress/${req.params.chapter}/${req.params.subchapter}.html`);
  try {
    const stats = fs.statSync(file);
    let html = fs.readFileSync(file, 'utf8');
    let $ = cheerio.load(html);

    $('.header-nav').prepend(menuView(req, res));
    $('.submenu > li > span').each(function(i, elem) {
      $(elem).attr('title', 'Unfinished Chapter');
      $(elem).addClass('unfinished');
    });

    if(!req.user) {
      $('.markdown-body').prepend(preview(req, res));
      $('.markdown-body').html(excerpt($));
    }

    res.send($.html());
  }
  catch (e) {
    console.log(e);
    res.status(404).send(`That Chapter Doesn't exist`);
  }
});

app.listen(process.env.PORT);
console.log("listening on: " + process.env.PORT);
