const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models')
const es6Renderer = require('express-es6-template-engine')
const bcrypt = require('bcrypt')
const morgan = require('morgan')
const logger = morgan('tiny')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({ db: db.sequelize })

app.use(cookieParser()); 

app.use(
  session({
    secret: 'secret', // used to sign the cookie
    resave: false, // update session even w/ no changes
    saveUninitialized: true, // always create a session
    store: store,
  })
  );
  store.sync()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));
app.use(logger)

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');