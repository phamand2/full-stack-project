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
const store = new SequelizeStore({
  db: db.sequelize
})
const passport = require('passport')
const flash = require('connect-flash')

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
app.use(bodyParser.urlencoded({
  extended: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport)

// Connect flash
app.use(flash())

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(express.static('./public'));
app.use(logger)

// Engine Template
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));